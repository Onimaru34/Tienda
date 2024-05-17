const Carrito = require('../models/carrito.js');

const httpCarrito = {
    listarCarritoPorCliente: async (req, res) => {
        
        try {
            const carrito = await Carrito.find({idcliente: req.params.idcliente});
            res.json(carrito);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    insertarElementoAlCarrito: async (req, res) => {
        const { idcliente, idproducto, cantidad, valor } = req.body;
        try {
            const nuevoElemento = new Carrito({ idcliente, idproducto, cantidad, valor });
            await nuevoElemento.save();
            res.status(201).json(nuevoElemento);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    eliminarElementoDelCarrito: async (req, res) => {
        const idcarrito = req.params.idcarrito;
        try {
            await Carrito.findByIdAndDelete(idcarrito);
            res.json({ message: 'Elemento eliminado del carrito correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = {httpCarrito}
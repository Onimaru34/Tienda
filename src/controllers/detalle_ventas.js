const DetalleVenta = require('../models/detalle_ventas');
const Venta = require('../models/ventas.js'); 

const httpDetalle = {
    // Listar detalle de venta por ID de venta
    listarDetalleVentaPorIdVenta: async (req, res) => {
        console.log(req.params.idVenta);
        
        try {
            const detallesVenta = await DetalleVenta.find({idventa: req.params.idventa});
            
            res.json(detallesVenta);
            /* console.log(detallesVenta) */
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Insertar nuevo detalle de venta
    insertarDetalleVenta: async (req, res) => {
        const { idcliente, idventa, fecha, valor } = req.body;
        try {
            const detalleVenta = new DetalleVenta({ idcliente, idventa, fecha, valor });
            await detalleVenta.save();
            res.status(201).json(detalleVenta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Modificar detalle de venta
    modificarDetalleVenta: async (req, res) => {
        const { id } = req.params;
        const { fecha, valor} = req.body;
        try {
            const detalleVenta = await DetalleVenta.findByIdAndUpdate(id, { fecha, valor }, { new: true });
            res.json(detalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    listarTodo: async (req, res) => {
        try {
            const Dventas = await DetalleVenta.find();
            res.json(Dventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = {httpDetalle};
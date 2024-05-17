const express = require('express');
const router = express.Router();
const { httpCarrito } = require('../controllers/carrito.js');
const { validarCampos } = require('../middlewares/validar-campos');
const { carritoHelper} = require('../helpers/carrito.js');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validarJWT')

// Rutas para operaciones del carrito
router.post('/agregar',[
    validarJWT,
    check('idcliente').custom(carritoHelper.existeClienteID),
    check('idproducto').custom(carritoHelper.existeProductoID),
    check('valor').isNumeric().withMessage('valor'),
    check('cantidad').isNumeric().withMessage('cantidad'),
    validarCampos
], httpCarrito.insertarElementoAlCarrito);

router.get('/cliente/:idcliente',[
    validarJWT,
    check('idcliente').custom(carritoHelper.existeClienteID),
    validarCampos
], httpCarrito.listarCarritoPorCliente);

router.delete('/borrar/:idcarrito',[
    validarJWT,
    check('idcarrito').custom(carritoHelper.existeCarritoID),
    validarCampos
], httpCarrito.eliminarElementoDelCarrito);

module.exports = router;
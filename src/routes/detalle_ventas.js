const express = require('express');
const router = express.Router();
const {httpDetalle} = require('../controllers/detalle_ventas.js');
const { validarCampos } = require('../middlewares/validar-campos');
const { detalleVHelper} = require('../helpers/detalle_venta.js');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validarJWT')

router.post('/',[
    validarJWT,
    check('idventa').custom(detalleVHelper.existeVentaID),
    check('idcliente').custom(detalleVHelper.existeClienteID),
    check('valor', 'El valor es obligatorio').not().isEmpty(),
    check('valor').isNumeric().withMessage('valor'),
    check('fecha', 'Fecha es obligatoria').not().isEmpty(),
    /* check('fecha').isDate().withMessage('fecha'), */
validarCampos
],httpDetalle.insertarDetalleVenta);

router.put('/detalle-venta/:id',[
    validarJWT,
    check('id').custom(detalleVHelper.existeDetalleVentaID),
    validarCampos
],httpDetalle.modificarDetalleVenta);

router.get('/venta/:idventa',[
    validarJWT,
    check('idventa').custom(detalleVHelper.existeVentaID),
    validarCampos
],httpDetalle.listarDetalleVentaPorIdVenta);

router.get('/listar',[
    validarJWT,
],httpDetalle.listarTodo);


module.exports = router;
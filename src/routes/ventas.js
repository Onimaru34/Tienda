const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { httpVenta } = require('../controllers/ventas.js'); 
const { ventaHelper } = require('../helpers/ventas.js')
const { validarJWT } = require('../middlewares/validarJWT')

router.post('/',[
    validarJWT,
    check('fecha', 'la fecha es obligatorio').not().isEmpty(),
    check('valor', 'el valor es obligatorio').not().isEmpty(),
    check('cantidad', 'la cantidad es obligatoria').not().isEmpty(),
    check('idcliente').custom(ventaHelper.existeClienteID),
    /* check('id', 'el cliente es obligatorio').not().isEmpty(), */
    validarCampos
], httpVenta.crear); 

router.put('/:id',[
    validarJWT,
    check('id').custom(ventaHelper.existeventaID),
    validarCampos
], httpVenta.actualizar); 

router.put('/activar/:id',[
    validarJWT,
    check('id').custom(ventaHelper.existeventaID),
    validarCampos
], httpVenta.activar); 

router.put('/desactivar/:id',
[
    validarJWT,
    check('id').custom(ventaHelper.existeventaID),
    validarCampos
],  httpVenta.desactivar); 

router.get('/:id',[
    validarJWT,
    check('id').custom(ventaHelper.existeventaID),
    validarCampos
], httpVenta.obtenerPorId); 

router.get('/ventas/activas',[
    validarJWT,
    /* check('id').custom(ventaHelper.existeventaID),
    validarCampos */
], httpVenta.listarActivas); 

router.get('/ventas/inactivas',[
    validarJWT,
    /* check('id').custom(ventaHelper.existeventaID),
    validarCampos */
], httpVenta.listarInactivas);

router.get('/cliente/:idcliente',[
    validarJWT,
    check('idcliente').custom(ventaHelper.existeClienteID),
    validarCampos
], httpVenta.listarPorCliente); 

router.get('/fechas/:inicio/:fin',[
    validarJWT,
    /* check('inicio').isDate().withMessage('fecha de inicio'),
    check('fin').isDate().withMessage('fecha fin'),
    validarCampos */
], httpVenta.listarPorRangoDeFechas); 

router.get('/valor/:valor',[
    validarJWT,
    check('valor').isNumeric().withMessage('valor'),
    validarCampos
], httpVenta.listarPorValorSuperior);

router.get('/totalventas/:inicio/:fin',[
    validarJWT,
    /* check('inicio').isDate().withMessage('fecha de inicio'),
    check('fin').isDate().withMessage('fecha fin'),
    validarCampos */
], httpVenta.calcularTotalPorRangoDeFechas); 

router.get('/ventas/totaldescuento',[
    validarJWT,
    /* check('totaldescuento').isNumeric().withMessage('totaldescuento'),
    validarCampos */
], httpVenta.calcularTotalDescuento); 

router.get('/',validarJWT, httpVenta.listarTodo); 


module.exports = router;
const express = require('express');
const router = express.Router();
const { httpProducto } = require('../controllers/productos.js');
const { validarCampos } = require('../middlewares/validar-campos');
const { productoHelper} = require('../helpers/productos.js');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validarJWT')


router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('stockminimo', 'El stock es obligatorio').not().isEmpty(),
    check('cantidad', 'La cantidad es obligatorio').not().isEmpty(),
    check('cantidad', 'Debe ingresar un numero').isNumeric(),
    validarCampos
], httpProducto.insertarProducto);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productoHelper.existeProductoID),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('stockminimo', 'El stock es obligatorio').not().isEmpty(),
    validarCampos
], httpProducto.modificarProducto);

router.put('/activar/:id',[
    validarJWT,
    check('id').custom(productoHelper.existeProductoID),
    validarCampos
], httpProducto.activarProducto);

router.put('/desactivar/:id',[
    validarJWT,
    check('id').custom(productoHelper.existeProductoID),
    validarCampos
], httpProducto.desactivarProducto);

router.get('/', validarJWT, httpProducto.listarProductos);

router.get('/productos/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productoHelper.existeProductoID),
    validarCampos
], httpProducto.obtenerProductoPorId);

router.get('/stock',[
    validarJWT,
    check('stockminimo').isNumeric().withMessage('stockminimo'),
   
], httpProducto.listarProductosBajoStock);

router.get('/productos/precio-mayor-a/:precio',[
    validarJWT,
    check('precio').isNumeric().withMessage('precio'),
    validarCampos
], httpProducto.listarProductosPorPrecio);



module.exports = router;
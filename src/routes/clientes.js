const express = require('express');
const router = express.Router();
const { httpCliente } = require('../controllers/clientes.js');
const { validarCampos } = require('../middlewares/validar-campos');
const { clienteHelper} = require('../helpers/clientes.js');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validarJWT')

// Rutas para los controladores de clientes
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('documento', 'El documento es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'email invalido').isEmail(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
validarCampos
], httpCliente.insertarCliente);

router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('documento', 'El documento es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(clienteHelper.existeEmail),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
], httpCliente.modificarCliente);

router.put('/desactivar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(clienteHelper.existeClienteID),
], httpCliente.desactivarCliente); 

router.put('/activar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(clienteHelper.existeClienteID),
], httpCliente.activarCliente); 

router.get('/',[
    validarJWT,
    check('id').custom(clienteHelper.existeClienteID),
    check('id', 'No es un ID válido').isMongoId(),
],httpCliente.listarClientes);

router.get('/clientes/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(clienteHelper.existeClienteID),
    validarCampos
],validarJWT, httpCliente.obtenerClientePorId);




module.exports = router;


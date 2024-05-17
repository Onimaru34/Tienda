const DetalleV=require('../models/detalle_ventas.js')
const Cliente=require('../models/clientes.js')
const Venta=require('../models/ventas')


const detalleVHelper = {

    existeDetalleVentaID: async (id, req) => {
        const existe = await DetalleV.findById(id)
        if (!existe) {
            throw new Error(`detalleVenta no existe ${id}`)
        }

        req.detalleVentabd = existe

    },

    existeClienteID: async (id, req) => {
        const existe = await Cliente.findById(id);
        if (!existe) {
            throw new Error(`No existe el cliente con ID ${id}`);
        }
        req.clientebd = existe; 

    },
  

    existeVentaID: async (id, req) => {
        const existe = await Venta.findById(id);
        if (!existe) {
            throw new Error(`No existe la venta con ID ${id}`);
        }
        req.ventabd = existe; 

    },
}
module.exports= {detalleVHelper}

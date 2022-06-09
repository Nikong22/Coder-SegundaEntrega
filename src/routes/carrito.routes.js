import {Router} from 'express';
import {
	agregarProducto,
	borrarProducto,
	getCarrito,
	getProductsFromCarrito,
} from '../controllers/carrito.controller.js';

const carritoRouter = Router();

carritoRouter
	.get('/listar', getCarrito)
	.get('/listar/:id_producto', getProductsFromCarrito)
	.post('/agregar/:id_producto', agregarProducto)
	.delete('/borrar/:id_producto', borrarProducto);

export default carritoRouter;

import {Router} from 'express';
import {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from '../controllers/productos.controller.js';

const productosRouter = Router();

productosRouter
	.get('/listar', getProducts)
	.get('/listar/:id', getProducts)
	.post('/agregar', createProduct)
	.put('/actualizar/:id', updateProduct)
	.delete('/borrar/:id', deleteProduct);

export default productosRouter;

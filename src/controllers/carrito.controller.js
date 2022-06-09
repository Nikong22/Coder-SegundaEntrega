import {Carrito} from '../models/ecommerce/Carrito.js';
import Response from '../models/server/response.js';
import db from '../../index.js';

const createCarrito = async () => {
	try {
		let carrito = new Carrito();
		console.log('createCarrito')
		console.log(carrito)
		carrito = await db.create('cart', carrito);
		return carrito;
	} catch (error) {
		console.log(error)
	}
};

export const getCarrito = async (req, res, next) => {
	const {id} = req.params;
	try {
		console.log('getCarrito')
		let carrito = await db.find('cart');
		console.log(carrito)
		if(carrito == null || carrito.length == 0){
			carrito = await createCarrito();
			console.log(carrito)
		}
		!carrito
			? res
					.status(404)
					.send(new Response(carrito, 'Carrito no encontrado', 404))
			: res.send(new Response(carrito));
	} catch (error) {
		console.log(error)
	}
};

export const getProductsFromCarrito = async (req, res) => {
	const {id_producto} = req.params;
	try {
		let carrito = await db.find('cart');
		if(carrito == null || carrito.length == 0){
			carrito = await createCarrito();
		}
		!carrito && id_producto
			? res
					.status(404)
					.send(new Response(carrito, 'Carrito no encontrado', 404))
			: res.send(new Response(carrito));
	} catch (error) {
		next(error);
	}

	return res.status(200).json(carrito.productos);
};

export const agregarProducto = async (req, res) => {
	try {
		let carrito = await db.find('cart');
		if(carrito == null || carrito.length == 0){
			carrito = await createCarrito();
		}
		carrito = await db.find('cart');
		const {id_producto} = req.params;
		
		const producto = await db.findById('products', id_producto)
		if(!producto){
			return res
			.status(404)
			.send(new Response(producto, 'Producto no encontrado', 404));
		}
		
		if(carrito.productos == null || !Array.isArray(carrito.productos)){
			carrito.productos = []
		}
		carrito.productos.push(producto);

		let response = await db.update('cart', carrito.id, {productos: carrito.productos});
			response
				? res.send(new Response(response))
				: res
						.status(404)
						.send(new Response(response, 'Carrito no encontrado', 404));
	} catch (error) {
		console.log(error)
	}
};

export const borrarProducto = async (req, res) => {
	try {
		let carrito = await db.find('cart');
		if(carrito == null || carrito.length == 0){
			carrito = await createCarrito();
		}

		const {id_producto} = req.params;

		if(carrito.productos == null || (Array.isArray(carrito.productos) && carrito.productos.length == 0)){
			return res
			.status(404)
			.send(new Response(null, 'Carrito vacío', 404));
		}

		const index = carrito.productos.findIndex((p) => {
			console.log(p)
			console.log(p.id)
			return p.id == id_producto
		});

		if(index < 0){
			return res
			.status(404)
			.send(new Response(null, 'Producto no encontrado', 404));
		}
	
		const deleted = carrito.productos.splice(index, 1);

		let response = await db.update('cart', carrito.id, {productos: carrito.productos});
			response
				? res.send(new Response(response))
				: res
						.status(404)
						.send(new Response(response, 'Carrito no encontrado', 404));
	} catch (error) {
		console.log(error)
	}
};
import {Producto} from '../models/ecommerce/Producto.js';
import Response from '../models/server/response.js';
import db from '../../index.js';

export const getProducts = async (req, res, next) => {
	const {id} = req.params;
	try {
		let response = id
			? await db.findById('products', id)
			: await db.find('products');
		!response && id
			? res
					.status(404)
					.send(new Response(response, 'Producto no encontrado', 404))
			: res.send(new Response(response));
	} catch (error) {
		next(error);
	}
};

export const createProduct = async (req, res, next) => {
	try {
		const {name, description, code, image, price, stock} = req.body;

		const newProduct = new Producto(
			name,
			description,
			code,
			image,
			price,
			stock
		);

		let response = await db.create('products', newProduct);
		res.send(new Response(response));
	} catch (error) {
		next(error);
	}
};

export const updateProduct = async (req, res, next) => {
	const {id} = req.params;
	try {
		const properties = [
			'id',
			'timestamp',
			'name',
			'description',
			'code',
			'image',
			'price',
			'stock',
		];
		let items = {};
		for (const key in req.body) {
			if (properties.includes(key)) {
				items[key] = req.body[key];
			}
		}
		let response = await db.update('products', id, items);
		response
			? res.send(new Response(response))
			: res
					.status(404)
					.send(new Response(response, 'Producto no encontrado', 404));
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = async (req, res, next) => {
	const {id} = req.params;
	try {
		let response = await db.remove('products', id);
		response
			? res.send(new Response(response))
			: res
					.status(404)
					.send(new Response(response, 'Producto no encontrado', 404));
	} catch (error) {
		next(error);
	}
};

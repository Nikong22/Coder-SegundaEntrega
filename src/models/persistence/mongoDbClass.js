import mongoose from 'mongoose';
import Products from './schemas/products.js';
import Cart from './schemas/cart.js';

export default function MongoDb(url, options) {
	this.connection = mongoose;
	this.inicializateSchemas = async () => {
		let data = await mongoose.connect(url, options);
		await Products.deleteMany({});
		await Cart.deleteMany({});
		return `Schemas inicializados en ${data.connections[0].name}`;
	};
	this.create = async (collection, items) => {
		let Collection = collection === 'products' ? Products : Cart;

		if (collection === 'products') {
			const {name} = items;
			let checkExists = await Collection.exists({name});
			if (checkExists) return 'The product already exists.';
		}
		const created = new Collection(items);
		await created.save();
		return created;
	};
	this.find = async (collection) => {
		let Collection = collection === 'products' ? Products : Cart;
		if(collection == 'products'){
			return await Collection.find();
		}else{
			let carritos = await Collection.find();
			console.log('find')
			console.log(carritos)
			if(carritos != null && carritos.length > 0){
				return carritos[0]
			}
			return null;
		}
	};
	this.findById = async (collection, id) => {
		let Collection = collection === 'products' ? Products : Cart;

		if (this.validateId(id)) {
			let found = await Collection.findById(id);
			return found || false;
		} else {
			return 'No valid ID.';
		}
	};
	this.update = async (collection, id, items) => {
		let Collection = collection === 'products' ? Products : Cart;

		if (this.validateId(id)) {
			let updated = await Collection.findByIdAndUpdate({_id: id}, items);

			if (updated) return await this.findById(collection, id);
			return false;
		} else {
			return 'No valid ID.';
		}
	};
	this.remove = async (collection, id) => {
		let Collection = collection === 'products' ? Products : Cart;

		if (this.validateId(id)) {
			let removed = await Collection.findByIdAndDelete(id);
			if (removed) return 1;
			return false;
		} else {
			return 'No valid ID.';
		}
	};
	this.validateId = async (id) => await mongoose.Types.ObjectId.isValid(id);
	this.validateDataType = () => {}; // optional
}

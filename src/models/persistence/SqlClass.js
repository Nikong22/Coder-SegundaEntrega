import knex from 'knex';
import validator from 'validator';

export default function Sql(options) {
	this.connection = knex(options);

	this.inicializateSchemas = async () => {
		try {
			await this.connection.schema.dropTableIfExists('products');
			await this.connection.schema.createTable('products', (table) => {
				table.string('id'),
					table.timestamp('timestamp'),
					table.string('name'),
					table.string('description'),
					table.string('code'),
					table.string('image'),
					table.decimal('price', 8, 2),
					table.integer('stock');
			});
			await this.connection.schema.dropTableIfExists('cart');
			await this.connection.schema.createTable('cart', (table) => {
				table.string('id'), table.json('productos');
			});
			return `Tablas inicializadas en ${this.connection.client.config.client}`;
		} catch (error) {
			await this.connection.destroy();
			throw new Error(error.message);
		}
	};
	this.create = async (tableName, items) => {
		try {
			if(tableName == 'products'){
				await this.connection(tableName).insert(items);
			}else{
				items.productos = JSON.stringify('')
				await this.connection(tableName).insert(items);
			}
			return await this.findById(tableName, items.id);
		} catch (error) {
			throw new Error(error.message);
		}
	};
	this.find = async (tableName) => {
		if(tableName == 'products'){
			return await this.connection.from(tableName).select('*')
		}else{
			let carrito = await this.connection.from(tableName).select('*')
			if(carrito != null && Array.isArray(carrito) && carrito.length > 0){
				carrito = carrito[0]
				if(carrito.productos != null && carrito.productos.length > 0){
					console.log(carrito.productos)
					carrito.productos = JSON.parse(carrito.productos)
				}
				return carrito
			}
			return null
		}
	}
	this.findById = async (tableName, id) => {
		try {
			let found = await this.connection
				.from(tableName, id)
				.select('*')
				.where('id', '=', id);
			return found.length ? found : false;
		} catch (error) {
			throw new Error(error.message);
		}
	};
	this.update = async (tableName, id, items) => {
		try {
			if(tableName == 'cart'){
				if(items.productos != null && Array.isArray(items.productos) && items.productos.length > 0){
					items.productos = items.productos[0]
				}
				items.productos = JSON.stringify(items.productos)
			}

			console.log('update')
			console.log(tableName)
			console.log(id)
			console.log(items)

			let updated = await this.connection
				.from(tableName, id)
				.select('*')
				.where('id', '=', id)
				.update(items);
			if (updated) return await this.findById(tableName, id);
			return false;
		} catch (error) {
			throw new Error(error.message);
		}
	};

	this.remove = async (tableName, id) => {
		try {
			let removed = await this.connection
				.from(tableName, id)
				.select('*')
				.where('id', '=', id)
				.del();
			return removed || false;
		} catch (error) {
			throw new Error(error.message);
		}
	};
	this.validateId = (id) => validator.isUUID(id); // optional
	this.validateDataType = () => {}; // optional
}

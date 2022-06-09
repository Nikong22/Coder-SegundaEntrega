import fs from 'fs';
export default function FileSystem() {
	this.connection = [];
	this.archivoProductos = 'productos.txt';
	this.archivoCarrito = 'carrito.txt';

	fs.writeFileSync(this.archivoProductos, '');
	fs.writeFileSync(this.archivoCarrito, '');

	this.inicializateSchemas = async () => {
		return 'Arrays en filesystem inicializados';
	};

	this.leer = async (objectName) => {
		try {
			if(objectName == 'products'){
				const data =  fs.readFileSync(this.archivoProductos, 'utf-8');
				return JSON.parse(data)
			}else{//cart
				const data =  fs.readFileSync(this.archivoCarrito, 'utf-8');
				return JSON.parse(data)
			}
		} catch (e) {
			console.log('Este array está vacío...');
			return []
		}
	}

	this.create = async (objectName, producto) => {
		if(objectName == 'products'){
			let productos = await this.leer(objectName);
			producto.id = productos.length + 1;
			productos.push(producto);
			fs.writeFileSync(this.archivoProductos, JSON.stringify(productos));
			return productos;
		}else{//cart
			let carrito = {
				id: 1,
				productos: []
			}
			fs.writeFileSync(this.archivoCarrito, JSON.stringify(carrito));
			return carrito;
		}
	};

	this.find = async (objectName) => {
		console.log('find')
		console.log(objectName)
		return await this.leer(objectName);
	};

	this.findById = async (objectName, id) => {
		if(objectName == 'products'){
			let productos = await this.leer(objectName);
			let prod = null;
			productos.forEach(producto => {
				if(producto.id == id){
					prod = producto;
					return;
				}
			});
			return prod;
		}else{//cart
			let carrito = await this.leer(objectName);
			let cart = null;
			carrito.forEach(producto => {
				if(producto.id == id){
					cart = producto;
					return;
				}
			});
			return cart;
		}
	};

	this.update = async (objectName, id, items) => {
		if(objectName == 'products'){
			let productos = await this.leer(objectName);
			let productosNuevos = []
			productos.forEach(producto => {
				if(producto.id == id){
					items.id = producto.id
					productosNuevos.push(items);
				}else{
					console.log(producto)
					productosNuevos.push(producto);
				}
			});
			fs.writeFileSync(this.archivoProductos, JSON.stringify(productosNuevos));
			return items;
		}else{//cart
			let carrito = await this.leer(objectName);
			console.log('graba esto')
			console.log(items)
			carrito.productos = items.productos;
			console.log(carrito)
			fs.writeFileSync(this.archivoCarrito, JSON.stringify(carrito));
			return items;
		}
	};

	this.remove = async (objectName, id) => {
		if(objectName == 'products'){
			let productos = await this.leer(objectName);
			
			const index = productos.findIndex((p) => p.id == id);

			if(index >= 0){
				const deleted = productos.splice(index, 1);
				fs.writeFileSync(this.archivoProductos, JSON.stringify(productos));
				return deleted;
			}else{
				//Producto no encontrado
				return [];
			}
		}else{//cart
			let carrito = await this.leer(objectName);
			const index = carrito.findIndex((p)=> p.id == id);
			console.log(index)
			if(index >= 0){
				const deleted = carrito.splice(index, 1);
				fs.writeFileSync(this.archivoCarrito, JSON.stringify(productos));
				return deleted;
			}else{
				return [];
			}
		}
	};

	this.validateId = () => {}; // optional
	this.validateDataType = () => {}; // optional
}
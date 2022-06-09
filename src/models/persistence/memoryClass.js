export default function Memory() {
	this.connection = [];
	this.inicializateSchemas = async () => {
		this.connection.products = [];
		this.connection.cart = [];
		return 'Arrays en memoria inicializados';
	};
	this.create = (objectName, items) => {
		this.connection[objectName].push(items);
		return items;
	};
	this.find = (objectName) => {
		if(objectName == 'products'){
			return this.connection[objectName]
		}else{
			return this.connection[objectName] != null && this.connection[objectName].length > 0 ? this.connection[objectName][0] : null
		}
	};
	this.findById = (objectName, id) => {
		console.log(this.connection[objectName])
		const index = this.connection[objectName].findIndex((p) => p.id == id);
		console.log(index)
		if(index >= 0){
			return this.connection[objectName][index]
		}
		return false;
	}

	this.update = (objectName, id, items) => {
		let index = this.connection[objectName].findIndex((el) => el.id == id);
		let product = this.findById(objectName, id);
		index > -1 && (this.connection[objectName][index] = {id: product.id, ...items});
		console.log(objectName)
		console.log(id)
		const elem = this.findById(objectName, id);
		console.log(elem)
		return elem;
	};
	this.remove = (objectName, id) => {
		let index = this.connection[objectName].findIndex((el) => el.id == id);
		if (index > -1) {
			this.connection[objectName].splice(index, 1);
			return 'Removed';
		} else {
			return false;
		}
	};
	this.validateId = () => {}; // optional
	this.validateDataType = () => {}; // optional
}

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import findOrCreate from 'mongoose-findorcreate';

const ProductsSchema = new Schema({
	name: {
		type: String,
		unique: true,
	},
	description: String,
	code: String,
	image: String,
	price: String,
	stock: String,
	timestamp: Date,
});

ProductsSchema.plugin(findOrCreate);

export default mongoose.model('products', ProductsSchema);

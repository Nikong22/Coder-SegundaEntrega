import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import findOrCreate from 'mongoose-findorcreate';

const cartSchema = new Schema({
	timestamp: Date,
	productos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'products',
		},
	],
});

cartSchema.plugin(findOrCreate);

export default mongoose.model('cart', cartSchema);

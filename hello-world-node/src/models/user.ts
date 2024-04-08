import mongoose, { Schema } from 'mongoose';

const User = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	lat: { type: String, required: true },
	long: { type: String, required: true },
	place: { type: String, required: true },
	country: { type: String, required: true },
});

export default mongoose.model('user', User);

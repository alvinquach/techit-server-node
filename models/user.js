const mongoose = require('mongoose');
require('./unit');
let userSchema = mongoose.Schema({
	department: String,
	email: String,
	phoneNumber: String,
	enabled: {
		type: Boolean,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	hash: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	position: {
		type: String,
		enum: ['SYS_ADMIN','SUPERVISING_TECHNICIAN','TECHNICIAN','USER'],
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	unit: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Unit'
	},
}, { collection: 'users' });
userSchema.index({'$**': 'text'});
let User = mongoose.model('User', userSchema);
module.exports = User;
 
mongoose.connection.on('connected', () => console.log('Mongoose for User connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for User disconnected."));
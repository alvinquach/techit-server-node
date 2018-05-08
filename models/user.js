const mongoose = require('mongoose');
require('./unit');
 
let userSchema = mongoose.Schema({
  department: String,
  email: String,
  enabled: Boolean,
  firstName: String,
  hash: String,
  lastName: String,
  phoneNumber: String,
  position: {
    type: String,
    enum: ['SYS_ADMIN','SUPERVISING_TECHNICIAN','TECHNICIAN','USER']
  },
  username: String,
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  email: String
}, { collection: 'users' });
 
let User = mongoose.model('User', userSchema);
module.exports = User;
 
mongoose.connection.on('connected', () => console.log('Mongoose for User connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for User disconnected."));
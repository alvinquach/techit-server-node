const mongoose = require('mongoose');
//lconst unit = require('./units');

// Create a schema, a model, and a new object

let userSchema = mongoose.Schema({
  id: Number,
  department: String,
  email: String,
  enabled: Boolean,
  firstName: String,
  hash: String,
  lastName: String,
  phoneNumber: String,
  position: {
    type: Number,
    enum: ['SYS_ADMIN', // 0 
      'SUPERVISING_TECHNICIAN', // 1
      'TECHNICIAN', // 2
      'USER'] // 3
  },
  username: String,
  unitId: { type: mongoose.Schema.Types.Number, ref: 'Unit' },
});

let User = mongoose.model('User', userSchema);
module.exports = User;


// Attach connection event handlers

mongoose.connection.on('connected', () => console.log('Mongoose for User connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for User disconnected."));

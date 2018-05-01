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
  email: String
});

let User = mongoose.model('User', userSchema);
module.exports = User;

// let user1 = new User({
//   id : 1,
//   username: 'techit',
//   hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
//   department: 'Test',
//   unit : 1,
//   firstName: 'Techit',
//   lastName : 'Admin',
//   email: 'admin@techit.com',
//   phoneNumber : '696-969-6969',
//   position : 'SYS_ADMIN',
//   enabled : 1
// });

// Attach connection event handlers

mongoose.connection.on('connected', () => console.log('Mongoose for User connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for User disconnected."));

// Using Promise
// async function run() {
//   await mongoose.connect('mongodb://localhost/hw4');

//   await User.remove();
//   console.log('All users removed.');

//   let savedUser = await user1.save();
//   console.log(`New user saved: ${savedUser._id}.`);

//   await mongoose.disconnect();
// }

// run();


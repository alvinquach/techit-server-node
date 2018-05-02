const mongoose = require('mongoose');

// Create a schema, a model, and a new object

let updateSchema = mongoose.Schema({
  id: Number,
  modifiedDate: Date,
  updateDetails: String,
  modifiedById: Number,
  ticketId: Number,
});

let Update = mongoose.model('Update', updateSchema);
module.exports = Update;


// Attach connection event handlers

mongoose.connection.on('connected', () => console.log('Mongoose for User connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for User disconnected."));

const mongoose = require('mongoose');

// Create a schema, a model, and a new object

let updateSchema = mongoose.Schema({
  modifiedDate: Date,
  updateDetails: String,
  modifiedById: { type: mongoose.Schema.Types.Number, ref: 'User' },
  ticketId: { type: mongoose.Schema.Types.Number, ref: 'Ticket' },
});

let Update = mongoose.model('Update', updateSchema);
module.exports = Update;


// Attach connection event handlers

mongoose.connection.on('connected', () => console.log('Mongoose for Update connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for Update disconnected."));

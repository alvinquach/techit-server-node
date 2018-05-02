const mongoose = require('mongoose');

// Create a schema, a model, and a new object

let ticketXrefTechSchema = mongoose.Schema({
  ticketId:{ type: mongoose.Schema.Types.Number, ref: 'Ticket' } ,
  updateDetechnicianId :{ type: mongoose.Schema.Types.Number, ref: 'User' } 
});

let tickets_xref_technicians = mongoose.model('tickets_xref_technicians', ticketXrefTechSchema);
module.exports = tickets_xref_technicians;


// Attach connection event handlers

mongoose.connection.on('connected', () => console.log('Mongoose for tickets_xref_technicians connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for tickets_xref_technicians disconnected."));

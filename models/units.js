const mongoose = require('mongoose');

let unitSchema = mongoose.Schema({
    id: Number,
    name: String
});

let Unit = mongoose.model('Unit', unitSchema);
module.exports = Unit;


// Attach connection event handlers
mongoose.connection.on('connected', () => console.log('Mongoose for Unit connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for Unit disconnected."));


const mongoose = require('mongoose');

let unitSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { collection: 'units' });

let Unit = mongoose.model('Unit', unitSchema);
module.exports = Unit;

mongoose.connection.on('connected', () => console.log('Mongoose for Unit connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for Unit disconnected."));
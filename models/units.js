const mongoose = require('mongoose');

let unitSchema = mongoose.Schema({
    id: Number,
    name: String
});

let Unit = mongoose.model('Unit', unitSchema);
module.exports = Unit;

// let unit1 = new Unit({
//     id: 1,
//     name: 'cs'
// });

// let unit2 = new Unit({
//     id: 2,
//     name: 'me'
// });

// Attach connection event handlers
mongoose.connection.on('connected', () => console.log('Mongoose for Unit connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for Unit disconnected."));

// Using Promise
// async function run() {
//     await mongoose.connect('mongodb://localhost/hw4');

//     await Unit.remove();
//     console.log('All units removed.');

//     let savedUnit1 = await unit1.save();
//     console.log(`New unit saved: ${savedUnit1._id}.`);

//     let savedUnit2 = await unit2.save();
//     console.log(`New unit saved: ${savedUnit2._id}.`);

//     await mongoose.disconnect();
// }

// run();

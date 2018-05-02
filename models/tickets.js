const mongoose = require('mongoose');

let ticketSchema = mongoose.Schema({
    id: Number,
    completionDetails: String,
    createdDate: Date,
    details : String,
    endDate: Date,
    lastUpdated: Date,
    location: String,
    priority: {
        type: Number,
        enum : ['NOT ASSIGNED','LOW','MEDIUM','HIGH'] // 0,1,2,3
    },
    startDate : Date,
    status : {
        type: Number,
        enum : ['OPEN','IN PROGRESS','ON HOLD','COMPLETED','CLOSED'] // 0,1,2,3,4
    },
    subject : String,
    createdById : { type: mongoose.Schema.Types.Number, ref: 'User' },
    unitId : { type: mongoose.Schema.Types.Number, ref: 'Unit' }
});

let Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;

// Attach connection event handlers
mongoose.connection.on('connected', () => console.log('Mongoose for Ticket connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for Ticket disconnected."));
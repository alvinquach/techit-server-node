const mongoose = require('mongoose');
require('./user');
require('./unit');


const ticketSchema = mongoose.Schema({
    completionDetails: String,
    details: String,
    location: String,
    priority: {
        type: String,
        enum: ['NOT_ASSIGNED','LOW','MEDIUM','HIGH'],
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    startDate: Date,
    endDate: Date,
    lastUpdated: Date,
    status: {
        type: String,
        enum: ['OPEN','IN_PROGRESS','ON_HOLD','COMPLETED','CLOSED'],
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    },
    technicians: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    updates: [{
        modifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        modifiedDate: {
            type: Date,
            required: true
        },
        updateDetails: String
    }]
}, { collection: 'tickets' });
ticketSchema.index({'$**': 'text'});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;

// Attach connection event handlers
mongoose.connection.on('connected', () => console.log('Mongoose for Ticket connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for Ticket disconnected."));
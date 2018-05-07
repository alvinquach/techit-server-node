const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    completionDetails: String,
    createdDate: Date,
    details: String,
    endDate: Date,
    lastUpdated: Date,
    location: String,
    priority: {
        type: Number,
        enum : ['NOT ASSIGNED','LOW','MEDIUM','HIGH'] // 0,1,2,3
    },
    startDate: Date,
    status: {
        type: Number,
        enum: ['OPEN','IN PROGRESS','ON HOLD','COMPLETED','CLOSED'] // 0,1,2,3,4
    },
    subject: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
    technicians: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    updates: [{
        modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        modifiedDate: Date,
        updateDetails: String
    }]
}, { collection: 'tickets' });

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;

// Attach connection event handlers
mongoose.connection.on('connected', () => console.log('Mongoose for Ticket connected.'));
mongoose.connection.on('disconnected', () => console.log("Mongoose for Ticket disconnected."));
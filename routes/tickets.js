const User = require('../models/user');
const Ticket = require('../models/ticket');
const authentication = require('../authentication/authentication');
const express = require('express');
const router = express.Router();

/** Create a new ticket. */
router.post('/:', (req, res, next) => {
    // TODO Implement this.
});

/** Get the technicians assigned to a ticket. */
router.get('/:ticketId/technicians', (req, res, next) => {
    // TODO Implement this.
});

/** Set the status of a ticket. Some status changes require a message explaining the reason of the change -- this message should be included in the request body. Each status change automatically adds an Update to the ticket. */
router.put('/:ticketId/status/:status', (req, res, next) => {
    // TODO Implement this.
});

/** Set the priority of a ticket. */
router.put('/:ticketId/priority/:priority', (req, res, next) => {
    // TODO Implement this.
});

module.exports = router;
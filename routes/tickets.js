const User = require('../models/user');
const Ticket = require('../models/ticket');
const authentication = require('../authentication/authentication');
const express = require('express');
const router = express.Router();

/**
 * Helper method for determining whether the user has permissions to edit the ticket in general.
 * Non-admins can only edit tickets that belong to their unit.
 */
const hasPermissionToEditTicket = (requestor, ticket) => {
    console.log(requestor)
    return requestor.position == 'SYS_ADMIN' || (requestor.unit._id || requestor.unit) == ticket.unit;
};

/** Create a new ticket. */
router.post('/', (req, res, next) => {

    const data = req.body;

    // Subject must be provided.
    if (data.subject == undefined) {
        return res.status(400).send("Subject is required.");
    }

    // Set priority and status if they are null or undefined.
    if (data.priority == undefined) {
        data.priority = 'NOT_ASSIGNED';
    }
    if (data.status == undefined) {
        data.status = 'OPEN';
    }

    // Auto populate fields
    data.createdBy = {
        _id: req.user._id
    }
    data.createdDate = new Date();

    // Save and send the new ticket data back to the client.
    new Ticket(data.save((err, ticket) => res.send(ticket)));

});

/** Get the technicians assigned to a ticket. */
router.get('/:ticketId/technicians', (req, res, next) => {
    Ticket.findById(req.params.ticketId)
        .populate({
            path: 'technicians',
            select: 'firstName lastName'
        })
        .exec((err, ticket) => {
            res.send(ticket.technicians);
        });
});

/** Set the status of a ticket. Some status changes require a message explaining the reason of the change -- this message should be included in the request body. Each status change automatically adds an Update to the ticket. */
router.put('/:ticketId/status/:status', (req, res, next) => {
    Ticket.findById(req.params.ticketId, (err, ticket) => {
        if (!hasPermissionToEditTicket(req.user, ticket)) {
            return res.status(403).send("You do not have permission to access this endpoint.");
        }
        // TODO Add error checking.
        ticket.status = req.params.status;
        ticket.save((err, ticket) => res.send(ticket));
    });
});

/** Set the priority of a ticket. */
router.put('/:ticketId/priority/:priority', (req, res, next) => {
    Ticket.findById(req.params.ticketId, (err, ticket) => {
        if (!hasPermissionToEditTicket(req.user, ticket)) {
            return res.status(403).send("You do not have permission to access this endpoint.");
        }
        // TODO Add error checking.
        ticket.priority = req.params.priority;
        ticket.lastUpdated = new Date();
        ticket.save((err, ticket) => res.send(ticket));
    });
});

module.exports = router;
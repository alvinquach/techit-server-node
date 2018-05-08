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
    return requestor.position == 'SYS_ADMIN' || (requestor.unit._id || requestor.unit) == ticket.unit;
};

/**
 * Helper method for determining whether the user has permissions to change the technician assignment of a ticket.
 * Non-admins can only change technician assignments of tickets that belong to their unit.
 * Technicians can only change the assignments of themselves.
 */
const hasPermissionToChangeAssignment = (requestor, ticket, assigneeId) => {
    return requestor.position == 'SYS_ADMIN'
        || ((requestor.unit._id || requestor.unit) == ticket.unit
            && (requestor.position != 'TECHNICIAN' || requestor._id == assigneeId));
};

/** Create a new ticket. */
router.post('/', (req,res, next)=>{
    const newTicket = new Ticket(res.body);  
    newTicket.save(err => {  
        return res.status(200).send(newTicket);
    });
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

    });
        
});

/** Set the priority of a ticket. */
router.put('/:ticketId/priority/:priority', (req, res, next) => {
    // TODO Implement this.
});

module.exports = router;
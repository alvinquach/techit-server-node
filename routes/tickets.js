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

/** Helper function for sending 404 error if the ticket doesnt exist. */
const ticketDoesNotExist = (res, ticketId) => {
	res.status(404).send(`Ticket '${ticketId}' could not be found.`);
};

/** Get existing ticket. */
router.get('/:ticketId', (req, res, next) => {

	// Specific permissions were not implemented for this endpoint
	// because this endpoint was not a requirement.

	const ticketId = req.params.ticketId;
	Ticket.findById(ticketId)
		.populate({
			path: 'technicians',
			select: 'firstName lastName'
		})
		.populate({
			path: 'createdBy',
			select: 'firstName lastName'
		})
		.populate({
			path: 'updates.modifiedBy',
			select: 'firstName lastName'
		})
		.populate('unit')
		.exec((err, ticket) => {
			if (!ticket) {
				return ticketDoesNotExist(res, ticketId);
			}
			res.send(ticket);
		});
});

/**Full text search for ticket */
router.get('/search/:searchable/', (req, res, next) => {

	// For now only sys admin should be able to access this
	if (req.user.position != 'SYS_ADMIN') {
		return res.status(403).send("You do not have access to this endpoint.");
	}
	const searchable = req.params.searchable;
	Ticket.find({
		$text: {
			$search: searchable
		}
	})
	.populate({
		path: 'technicians',
		select: 'firstName lastName'
	})
	.populate({
		path: 'updates.modifiedBy',
		select: 'firstName lastName'
	})
	.populate('unit')
	.exec((err, ticket) => {
		if (!ticket) {
			return ticketDoesNotExist(res, searchable);
		}
		res.send(ticket);
	});

});

/** Create a new ticket. */
router.post('/', async (req, res, next) => {

	const data = req.body;

	// Subject must be provided.
	if (data.subject == undefined) {
		return res.status(400).send("Subject is required.");
	}

	// If there is an id provided, check if a ticket with the same id already exists.
	if (data._id) {
		const existing = await Ticket.findById(data.id).exec();
		if (existing) {
			return res.status(400).send(`Ticket '${data._id}' already exists.`);
		}
	}

	// Set priority and status if they are not specified.
	if (!data.priority) {
		data.priority = 'NOT_ASSIGNED';
	}
	if (!data.status) {
		data.status = 'OPEN';
	}

	// Auto populate fields
	data.createdBy = {
		_id: req.user._id
	};
	data.createdDate = new Date();

	// Save and send the new ticket data back to the client.
	new Ticket(data).save((err, ticket) => res.send(ticket));

});

/** Get the technicians assigned to a ticket. */
router.get('/:ticketId/technicians', (req, res, next) => {
	const ticketId = req.params.ticketId;
	Ticket.findById(ticketId)
		.populate({
			path: 'technicians',
			select: 'firstName lastName'
		})
		.exec((err, ticket) => {
			if (!ticket) {
				return ticketDoesNotExist(res, ticketId);
			}
			res.send(ticket.technicians);
		});
});

/** Set the status of a ticket. Some status changes require a message explaining the reason of the change -- this message should be included in the request body. Each status change automatically adds an Update to the ticket. */
router.put('/:ticketId/status/:status', (req, res, next) => {
    const ticketId = req.params.ticketId;
    Ticket.findById(req.params.ticketId, (err, ticket) => {

        if (!ticket) {
            return ticketDoesNotExist(res, ticketId);
        }

        if (!hasPermissionToEditTicket(req.user, ticket)) {
            return res.status(403).send("You do not have permission to access this endpoint.");
        }

        // Status changes require a description.
        const description = req.body.description;
        if (!description && description !== 0) {
            return res.status(400).send("Description of the status change is required.");
        }

        // Check if the status was actually changed.
        const newStatus = req.params.status;
        if (newStatus == ticket.status) {
            return res.status(400).send(`Status was already ${newStatus}.`);
        }

        // TODO Check if the new status is a valid status.
        ticket.status = newStatus;
        if (newStatus == "COMPLETED") {
            ticket.completionDetails = description;
        }

        const now = new Date();
        ticket.lastUpdated = now;

        // Create a new update to document the status change and add it to the ticket.
        if (!ticket.updates) {
            ticket.updates = [];
        }
        ticket.updates.push({
            updateDetails: `Status changed to ${newStatus}. Reason: ${description}`,
            modifiedDate: now,
            modifiedBy: {
                _id: req.user._id
            }
        });

        ticket.save((err, ticket) => res.send(ticket));
    });

    ticket.save((err, ticket) => res.send(ticket));
  });


/** Set the priority of a ticket. */
router.put('/:ticketId/priority/:priority', (req, res, next) => {
	const ticketId = req.params.ticketId;
	Ticket.findById(req.params.ticketId, (err, ticket) => {
		if (!ticket) {
			return ticketDoesNotExist(res, ticketId);
		}
		if (!hasPermissionToEditTicket(req.user, ticket)) {
			return res.status(403).send("You do not have permission to access this endpoint.");
		}
		// TODO Add error checking.
		ticket.priority = req.params.priority;
		ticket.lastUpdated = new Date();
		ticket.save((err, ticket) => res.send(ticket));
	});
});

/** Add an update to a ticket */
router.post('/:ticketId/update', (req, res, next) => {
	const ticketId = req.params.ticketId;
	Ticket.findById(req.params.ticketId, (err, ticket) => {
		if (!ticket) {
			return ticketDoesNotExist(res, ticketId);
		}
		if (!hasPermissionToEditTicket(req.user, ticket)) {
			return res.status(403).send("You do not have permission to access this endpoint.");
		}
		const updateDetails = req.body.updateDetails;
		if (updateDetails == undefined) {
			return res.status(400).send("Update details is required.");
		}
		const now = new Date();
		ticket.updates.push({
			updateDetails: updateDetails,
			modifiedBy: {
				_id: req.user._id
			},
			modifiedDate: now
		});
		ticket.lastUpdated = now;
		ticket.save((err, ticket) => {
			Ticket.populate(ticket, [
				{
					path: 'technicians',
					select: 'firstName lastName'
				},
				{
					path: 'createdBy',
					select: 'firstName lastName'
				},
				{
					path: 'updates.modifiedBy',
					select: 'firstName lastName'
				},
				'unit'
			], (err, ticket) => res.send(ticket));
		});
	});
});

module.exports = router;

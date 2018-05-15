const User = require('../models/user');
const Ticket = require('../models/ticket');
const Unit = require('../models/unit');
const authentication = require('../authentication/authentication');
const express = require('express');
const router = express.Router();

/** Get list of units. */
router.get('/', (req, res, next) => {
    Unit.find({}, (err, units) => {
        res.send(units);
    });
});

/** Get the technicians of a unit. */
router.get('/:unitId/technicians', authentication.authenticatePosition('SYS_ADMIN'), (req, res, next) => {
    const query = {
        unit: req.params.unitId,
        position: {$in: ['SUPERVISING_TECHNICIAN', 'TECHNICIAN']}
    }
    User.find(query)
        .populate('unit')
        .exec((err, technicians) => {
            res.send(technicians);
        });
});

/** Get the tickets submitted to a unit. */
router.get('/:unitId/tickets', authentication.authenticatePosition('SYS_ADMIN'), (req, res, next) => {
    Ticket.find({ unit: req.params.unitId })
        .populate({
            path: 'createdBy',
            select: 'firstName lastName'
        })
        .populate('unit')
        .populate({
            path: 'technicians',
            select: 'firstName lastName'
        })
        .exec((err, tickets) => {
            res.send(tickets);
        });
});

module.exports = router;
const User = require('../models/user');
const Ticket = require('../models/ticket');
const authentication = require('../authentication/authentication');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', authentication.authenticatePosition('SYS_ADMIN'), (req, res, next) => {
    User.find({}, "-hash")
        .populate('unit')
        .exec((err, users) => {
            res.send(users);
        });
});

/** Get user by ID. */
router.get('/:userId', (req, res, next) => {
    
    // Specific permissions were not implemented for this endpoint
    // because this endpoint was not a requirement.

    User.findOne({ _id: req.params.userId }, "-hash")
        .populate('unit')
        .exec((err, user) => {
            res.send(user);
        });
});

/** Get tickets submitted by a user. */
router.get('/:userId/tickets', (req, res, next) => {

    const userId = req.params.userId;

    // Regular users can only access tickets that they created.
    if (req.user.position == 'USER' && req.user._id != userId) {
        return res.status(403).send("You do not have access to this endpoint.");
    }

    Ticket.find({ createdBy: userId })
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

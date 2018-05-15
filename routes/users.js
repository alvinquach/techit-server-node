const User = require('../models/user');
const Ticket = require('../models/ticket');
const authentication = require('../authentication/authentication');
const express = require('express');
const router = express.Router();

/** Helper function for sending 404 error if the user doesnt exist. */
const userDoesNotExist = (res, userId) => {
    res.status(404).send(`User '${userId}' could not be found.`);
};

/* GET users listing. */
router.get('/', authentication.authenticatePosition('SYS_ADMIN'), (req, res, next) => {
    User.find({}, "-hash")
        .exec((err, users) => {
            res.send(users);
        });
});

/**Full text search for user */
router.get('/search/:searchable/', (req, res, next) => {
    
    // For now only sys admin should be able to access this
    if (req.user.position != 'SYS_ADMIN') {
        return res.status(403).send("You do not have access to this endpoint.");
    }
    const searchable = req.params.searchable;
    User.find({$text: {$search: searchable}}, "-hash")
       .populate('unit')
       .exec((err, user) => {
        if (!user) {
            return userDoesNotExist(res, searchable);
        }
        res.send(user);
    });
        
});

/** Get user by ID. */
router.get('/:userId', (req, res, next) => {
    
    // Specific permissions were not implemented for this endpoint
    // because this endpoint was not a requirement.

    const userId = req.params.userId;
    User.findById(userId, "-hash")
        .populate('unit')
        .exec((err, user) => {
            if (!user) {
                return userDoesNotExist(res, userId);
            }
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

const User = require('../models/user');
const Ticket = require('../models/ticket');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}, "-hash")
        .populate('unit')
        .exec((err, users) => {
            res.send(users);
        });
});

/** Get user by ID. */
router.get('/:userId', function(req, res, next) {
    console.log(req.user);
    User.findOne({_id: req.params.userId}, "-hash")
        .populate('unit')
        .exec((err, users) => {
            res.send(users);
        });
});

/** Get tickets submitted by a user. */
router.get('/:userId/tickets', function(req, res, next) {
    Ticket.find({createdBy: req.params.userId})
        .populate({
            path: 'createdBy',
            select: 'firstName lastName'
        })
        .populate('unit')
        .populate({
            path: 'technicians',
            select: 'firstName lastName'
        })
        .exec((err, users) => {
            res.send(users);
        });
});

module.exports = router;

const User = require('../models/user');
const Ticket = require('../models/ticket');
const Unit = require('../models/unit');
const authentication = require('../authentication/authentication');
const express = require('express');
const router = express.Router();

/** Get the technicians of a unit. */
router.get('/:unitId/technicians', authentication.authenticatePosition('SYS_ADMIN'), (req, res, next) => {
    // TODO Implement this.
});

/** Get the tickets submitted to a unit. */
router.get('/:unitId/tickets', authentication.authenticatePosition('SYS_ADMIN'), (req, res, next) => {
    // TODO Implement this.
});

module.exports = router;
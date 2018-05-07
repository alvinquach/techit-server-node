const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const invalidError = {
    status: 401,
    message: "Invalid username or password."
};

router.post('/', function(req, res, next) {
    const username = req.query.username;
    const password = req.query.password;
    if (!username || !password) {
        next(invalidError);
        return;
    }
    User.findOne({username: username}, (err, user) => {
        if (!user) {
            next(invalidError);
            return;
        }
        bcrypt.compare(password, user.hash, (err, same) => {
            if (err || !same) {
                next(invalidError);
                return;
            }
            const payload = {
                id: user._id,
                username: user.username,
                position: user.position,
                unitId: user.unit
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS512' });
            res.send("Bearer " + token);
        });
        
    });
});

module.exports = router;
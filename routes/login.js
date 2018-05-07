const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const sendUnauthorized = (res) => {
    res.status(401).send("Invalid username or password.");
}

router.post('/', (req, res, next) => {
    const username = req.query.username;
    const password = req.query.password;
    if (!username || !password) {
        return sendUnauthorized(res);
    }
    User.findOne({username: username}, (err, user) => {
        if (!user) {
            return sendUnauthorized(res);
        }
        bcrypt.compare(password, user.hash, (err, same) => {
            if (err || !same) {
                return sendUnauthorized(res);
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
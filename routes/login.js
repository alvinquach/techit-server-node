const authentication = require('../authentication/authentication');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    const jwt = await authentication.generateJwt(req.query.username, req.query.password);
    if (!jwt) {
        return res.status(401).send("Invalid username or password.");
    }
    res.send(jwt);
});

module.exports = router;
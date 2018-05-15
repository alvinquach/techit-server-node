const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passportConfig = require('./passport');

const sendForbidden = (res) => {
    res.status(403).send("You do not have access to this API");
}

const config = (passport) => {
    passportConfig.config(passport);
}

const authenticateToken = (passport) => {
    return passportConfig.authenticate(passport);
}

const authenticatePosition = (positions) => {
    return (req, res, next) => {
        if (!Array.isArray(positions)) {
            positions = [positions];
        }
        if (!req.user || !req.user.position) {
            return sendForbidden(res);
        }
        console.log(req.user, positions)
        if (positions.indexOf(req.user.position) == -1) {
            return sendForbidden(res);
        }
        //what next is doing?
        next();
    }
}

const generateJwt = async (username, password) => {
    if (username && password) {
        const user = await User.findOne({username: username}).exec();
        if (user) {
            if (await bcrypt.compare(password, user.hash)) {
                const payload = {
                    id: user._id,
                    username: user.username,
                    position: user.position,
                    unitId: user.unit
                }
                const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS512' });
                return "Bearer " + token;
            }
        }
    }
    return null;
};

module.exports = {
    config,
    authenticateToken,
    authenticatePosition,
    generateJwt
};
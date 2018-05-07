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
        next();
    }
}

module.exports = {
    config,
    authenticateToken,
    authenticatePosition
};
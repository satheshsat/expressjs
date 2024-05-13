const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; 

    // Remove Bearer from string
    token = token.replace(/^Bearer\s+/, "");

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
            return res.status(403).json({
                success: false,
                message: 'Token is not valid'
            });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).json({
            message: 'Unathorized'
        });
    }
}

module.exports = {
    validateToken
};
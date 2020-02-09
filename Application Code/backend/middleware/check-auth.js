const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { userId: decodedToken.userId, authorization: decodedToken.authorization, department: decodedToken.department };
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Unauthorized authentication'
        })
    }

}
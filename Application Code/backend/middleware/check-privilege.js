exports.teacher = (req, res, next) => {
    if (parseInt(req.userData.authorization !== 1)) {
        return res.status(401).json({
            message: 'You do not have the required authorization'
        })
    }
    else {
        next();
    }
}

exports.hod = (req, res, next) => {
    if (parseInt(req.userData.authorization !== 0)) {
        return res.status(401).json({
            message: 'You do not have the required authorization'
        })
    }
    else {
        next();
    }
}

exports.student = (req, res, next) => {
    if (parseInt(req.userData.authorization !== 2)) {
        return res.status(401).json({
            message: 'You do not have the required authorization'
        })
    }
    else {
        next();
    }
}
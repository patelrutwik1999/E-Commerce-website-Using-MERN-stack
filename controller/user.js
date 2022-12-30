const User = require('../models/user')

exports.userById = (req, res, next, id) => {
    console.log(id)
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: "User not found"
            })
        }

        req.profile = user;
        next();
    })
}
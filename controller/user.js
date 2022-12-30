const User = require('../models/user')
const jwt = require('jsonwebtoken') //To generate signed token.
const expressJwt = require('express-jwt'); // Authorization check
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.signup = (req, res) => {

    console.log("Req Body", req.body)
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ err: errorHandler(err) })
        }
        res.json({
            user
        })
    })
}

exports.signin = (req, res) => {
    //Finding user based on email
    console.log(req.body)
    const { email, password } = req.body

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: 'User with this email does not exist!! Please signup'
            })
        }

        //If user is found, make sure that email and password matches.
        //create authenticate method in user model.
        if (!user.authenticate(password)) {
            return res.json(401).json({
                error: 'Password and Email doesnot match'
            })
        }

        //generate a signed token with user id and secret
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET)

        //Persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 })

        //Return response with user and token to frontend client
        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, email, name, role } })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: "Sign out Successfull." })
}
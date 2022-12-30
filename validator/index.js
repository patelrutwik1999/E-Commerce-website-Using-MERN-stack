exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').not().isEmpty();
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .withMessage("Improper Email Id")
        .isLength({
            min: 4,
            max: 32
        })
    req.check('password', 'Password is required').not().isEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain atleast 6 characters')
        .matches(/\d/)
        .withMessage("Password must contain a number")

    const errors = req.validationErrors();
    if (errors) {
        //Throwing out the first error encountered.
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }

    //If not specified then the website will halt. It specifies(kind of callback) which one passed all the validations will take the application forward.
    next();
}
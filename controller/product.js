const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Product = require("../models/product")
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    //we cannot use req.body as we will be saving photo from the forms.
    //We will use formidable package for handling image. 
    //Also lodash package which has some helper methods.

    //All the form data will be available from new Formidable incoming form.
    let form = new formidable.IncomingForm();

    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).json({ error: "Image could not be uploaded!!" })

        let product = new Product(fields)

        //files."name" -> name depends on how the data is been send from the client side (if it is name of image then here it has to be the same.)
        if (files.photo) {
            console.log("files.photo: ", files.photo)
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size",
                })
            }

            product.photo.data = fs.readFileSync(files.photo.filepath)
            product.photo.contentType = files.photo.mimetype
        }

        product.save((err, result) => {
            if (err) return res.status(400).json({ error: errorHandler })

            res.json(result)
        })
    })
}
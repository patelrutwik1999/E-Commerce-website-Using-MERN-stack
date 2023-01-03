const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Product = require("../models/product")
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err) return res.status(400).json({ error: "Product not Found!!" })

        req.product = product
        next()
    })
}

exports.read = (req, res) => {
    //Photos are large in size and that is the only reason it is not been send here.
    req.product.photo = undefined;
    return res.json(req.product)
}

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) return res.status(400).json({
            error: errorHandler(err)
        })

        res.json({
            "Message": "Product deleted successfully!!"
        })
    })
}

exports.update = (req, res) => {
    //All the form data will be available from new Formidable incoming form.
    let form = new formidable.IncomingForm();

    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).json({ error: "Image could not be uploaded!!" })

        //Check for all the fields
        const { name, description, price, category, shipping, quantity } = fields

        if (!name || !description || !price || !category || !shipping || !quantity) {
            res.json({
                error: "All fields are required!!"
            })
        }

        let product = req.product
        //lodash is used effieciently when we need to update the data.
        product = _.extend(product, fields)

        //files."name" -> name depends on how the data is been send from the client side (if it is name of image then here it has to be the same.)
        if (files.photo) {
            console.log("files.photo: ", files.photo)
            //File sizes:
            //1kb = 1000
            //1mb = 1000000

            //Here we make sure that the file is less than 1 mb.
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

exports.create = (req, res) => {
    //we cannot use req.body as we will be saving photo from the forms.
    //We will use formidable package for handling image. 
    //Also lodash package which has some helper methods.

    //All the form data will be available from new Formidable incoming form.
    let form = new formidable.IncomingForm();

    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).json({ error: "Image could not be uploaded!!" })

        //Check for all the fields
        const { name, description, price, category, shipping, quantity } = fields

        if (!name || !description || !price || !category || !shipping || !quantity) {
            res.json({
                error: "All fields are required!!"
            })
        }

        let product = new Product(fields)

        //files."name" -> name depends on how the data is been send from the client side (if it is name of image then here it has to be the same.)
        if (files.photo) {
            console.log("files.photo: ", files.photo)
            //File sizes:
            //1kb = 1000
            //1mb = 1000000

            //Here we make sure that the file is less than 1 mb.
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

// Sell or Arrival
// Query Paramaters: 
// by sell = /products?sortBy=sold&order=desc&limit=4
// by arrival = /products?sortBy=createdAt&order=desc&limit=4
//If no params are sent, then all products are returned.

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? req.query.limit : 6

    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) return res.status(400).json({ error: "Products not found!!" })

            res.json(products)
        })
}
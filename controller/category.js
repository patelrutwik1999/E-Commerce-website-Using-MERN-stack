const Category = require('../models/category')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if (err) return res.status(400).json({ error: errorHandler })

        res.json({
            data
        })
    })
}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) return res.status(400).json({ error: 'Category doesnot exist' })

        req.category = category
        console.log("Category By Id", req.category)
        next()
    })
}

exports.read = (req, res) => {
    console.log("Category: ", req.category)
    return res.json(req.category)
}

exports.update = (req, res) => {
    const category = req.category
    category.name = req.body.name

    category.save((err, data) => {
        if (err) return res.status(400).json({ error: errorHandler(err) })

        res.json(data)
    })
}

exports.remove = (req, res) => {
    const category = req.category
    category.remove((err, data) => {
        if (err) return res.status(400).json({ error: errorHandler(err) })
    })

    res.json({
        "Message": "Message Deleted Successfully!!"
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) return res.status(400).json({ error: errorHandler(err) })

        res.json(data)
    })
}
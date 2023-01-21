const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxLength: 32
        },
        description: {
            type: String,
            required: true,
            maxLength: 2000
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxLength: 32
        },
        //Using another model as each product must have a category(relationship)
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        shipping: {
            type: Boolean,
            required: true,
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
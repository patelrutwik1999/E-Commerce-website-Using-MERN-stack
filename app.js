const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
const braintree = require('braintree');

//dotenv -> to use .env file
require('dotenv').config()

//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')

//Database connection
mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true
    }
).then(() => { console.log('DB Connected') })

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})

const app = express()

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
//It will able to handle request coming from different routes. Front end will have different route. 3001 -> 8000
app.use(cors())


// app.get("/", (req, res) => {
//     res.send("I love Node Js")
// })

//routes middleware
app.use("/api", authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', braintreeRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on Port number ${port}`)
})


const { json } = require('express')
const express = require('express')
const router = express.Router()

const ApiBookRoute = require('./apibookroutes')


//middleware
router.use('/book',ApiBookRoute)


//routes


module.exports=router
const { json } = require('express')
const express = require('express')
const router = express.Router()

const ApiBookRoute = require('./apibookroutes')
const apiUserRoute = require('./apiuserroutes')

//middleware
router.use('/book',ApiBookRoute)
router.use('/user',apiUserRoute)

//routes


module.exports=router
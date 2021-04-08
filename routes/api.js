const { json } = require('express')
const express = require('express')
const router = express.Router()

const ApiBookRoute = require('./apibookroutes')
const apiUserRoute = require('./apiuserroutes')
const login= require('./loginroutes')

//middleware
router.use('/book',ApiBookRoute)
router.use('/user',apiUserRoute)
router.use('/login',login)

//routes


module.exports=router
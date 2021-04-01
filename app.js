const express = require('express')
const mongoose= require('mongoose')
const bookRoutes = require('./routes/bookroutes')
require('dotenv/config')

const app=express()

//middleware
app.use('/',bookRoutes)


//routes
mongoose.connect(process.env.DB_CONNECTION,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})



//port
app.listen(3000)







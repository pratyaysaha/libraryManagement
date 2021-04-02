const express = require('express')
const mongoose= require('mongoose')
const bookRoutes = require('./routes/bookroutes')
const apiRoutes=require('./routes/api')
require('dotenv/config')

const app=express()

//middleware
app.use('/book',bookRoutes)
app.use('/api',apiRoutes)


//routes
app.get('/', (req, res)=>{
    res.send("Home")
})


//mongoose connection
mongoose.connect(process.env.DB_CONNECTION,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})



//port
app.listen(3000)







const { json } = require('express')
const express = require('express')
const router=express.Router();

router.use(express.json())

//routes


//page routes
router.get('/',(req, res)=>{
    res.send("This is book page")
})







module.exports=router
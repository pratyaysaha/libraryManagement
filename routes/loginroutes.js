const express=require('express')
const User=require('../models/User')
const validateUser=require('../functions/validateuser')




const router=express.Router()
router.use(express.json())

router.post("/",async (req,res)=>{
    var credString=""
    if(req.body.username)
        credString+=req.body.username
    if(req.body.password)
        credString+=" "+req.body.password
    const validationResult=await validateUser(credString,'all')
    res.json(validationResult)
})





module.exports=router
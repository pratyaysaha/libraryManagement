const express =require ('express')
const User=require('../models/User')
const bcrypt=require('bcrypt')
const validateUser=require('../functions/validateuser')




const router=express.Router()

router.use(express.json())


router.post('/', async (req,res)=>{
    try{
        var hashedPassword= await bcrypt.hash(req.body.password,10)
    }
    catch(err){
        res.json({'status' : false, 'error' : err, 'code' : 21}) 
    }
    const user=new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.username,
        email : req.body.email,
        dob : req.body.dob,
        phoneNumber : req.body.phoneNumber,
        password : hashedPassword,
        role : req.body.role
    })
    try{
        const newUser=await user.save()
        res.json({'status' : true, 'data' : newUser})
    }
    catch(err){
        res.json({"status" : false , 'error': err, 'code' : 22}) 
    }
})
router.get('/', async (req,res)=>{
    const {status, error, code}=await validateUser(req.query.appid,"admin")
    if(status==false)
        res.json({'status' : status, error, code})
    var querySearch={}
    const queryLookUp=[ "firstName", "lastName", "username", "email", "dob", "phoneNumber", "role" ,"id"]
    for(queryItem in req.query)
    {
        if(queryLookUp.includes(queryItem) && queryItem!== "appid")
        {  
            if(queryItem=='id')
                querySearch["_id"]=req.query[queryItem]
            else
            querySearch[`${queryItem}`]=req.query[queryItem]
        }
    }
    console.log(querySearch)
    
    try{
        const searchQuery= await User.find(querySearch,{password : 0})
        res.json(searchQuery)
    }
    catch(err){
        res.json({'status' : false, 'error' : err, 'code' : 26}) 
    }
})






module.exports=router
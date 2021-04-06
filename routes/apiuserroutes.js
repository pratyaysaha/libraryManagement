const express =require ('express')
const bcrypt=require('bcrypt')
const User=require('../models/User')


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
    try{
        if(req.query.appid == undefined)
            throw new Error(0)
        var cred=req.query.appid.split('@')
        console.log(cred)
        if(cred.length< 2 || cred.length > 2)
            throw new Error(cred.length)
    }
    catch(err){
        error={'status' : false}
        if(err > 2)
        {
            error.error="Enter Username@Password"
            error.code=23
        }
        else
        {
            error.error="Enter Username@Password"
            error.code=24
        }
        res.json(error)
    }    
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
        const adminSearch= await User.findOne({'username' : cred[0], role: 'admin'})
        if(adminSearch == null)
            throw new Error("Admin not found")  
        const {password} = adminSearch
        const isTrue= await bcrypt.compare(cred[1],password)
        if(isTrue == false)
            throw new Error("Password incorrect")
    }
    catch(err){ 
        res.json({'status': false, 'error': err.message, 'code' : 25 })  
    }
    try{
        const searchQuery= await User.find(querySearch,{password : 0})
        res.json(searchQuery)
    }
    catch(err){
        res.json({'status' : false, 'error' : err, 'code' : 26}) 
    }
})


router.patch("/", (req,res) => {
    res.json({"status" : true})
})


module.exports=router
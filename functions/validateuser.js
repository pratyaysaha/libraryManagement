const User=require('../models/User')
const bcrypt=require('bcrypt')
const validateUser = async (credString,roles) =>{
    var error={'status': false}
    try{
        if(credString == undefined)
            throw new Error(0)
        var cred=credString.split('@')
        if(cred.length< 2 || cred.length > 2)
            throw new Error(cred.length)
    }
    catch(err){
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
        return error 
    }
    try{
        const userSearch= await User.findOne({'username' : cred[0], role: roles})
        if(userSearch == null)
            throw new Error(`${roles} not found`)  
        const {password} = userSearch
        const isTrue= await bcrypt.compare(cred[1],password)
        if(isTrue == false)
            throw new Error("Password incorrect")
        else    
            return {'status' : true, 'error' : "No error"}
    }
    catch(err){ 
        error.error=err.message
        error.code=25
    }  
    console.log(error)  
    return error
}

module.exports=validateUser
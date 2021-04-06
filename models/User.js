const mongoose=require('mongoose')
const { default: validator } = require('validator')


const userSchema=mongoose.Schema({
    firstName:{
        type : String,
        required : true,
        lowercase:true,
    },
    lastName:{
        type : String,
        required : true,
        lowercase : true,
    },
    username:{
        type : String,
        required : true,
        unique : true,
    },
    email:{
        type : String,
        required : true,
        unique :  true,
        validate :{
            validator : (value) =>{
                return validator.isEmail(value)
            },
            message : "Provide a valid email"

        }
    },
    phoneNumber :{
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : (value) => {
                return validator.isMobilePhone(value)
            },
            message : "Provide a valid phone number"
        }
    },
    dob : {
        type : Date,
        required : true,
        validate : {
            validator : (value) => {
                return validator.isDate(value)  
            },
            message : "Provide a valid date"
        }
    },
    password : {
        type : String,
        required :  true,
    },
    role : {
        type : String,
        required : true,
        lowercase : true,
        enum : ['admin','user']
    }

})

module.exports=mongoose.model('User',userSchema)
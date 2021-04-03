const mongoose=require('mongoose')


const BookSchema=mongoose.Schema({
    isbn:{
        type : Number,
        required: true,
        unique : true
    },
    name:{
        type : String,
        required: true,
        lowercase:true,
        
    },
    publisher:{
        type : String,
        required: true,
        lowercase: true
    },
    author:{
        type: [String],
        required: true,
        lowercase: true
    },
    price:{
        type : Number,
        required: true,
        min: 0
    },
    yop:{
        type: Number,
        required : true
    },
    edition: {
        type : Number,
        default : 1,
        min:1
    },
    total:{
        type : Number,
        required: true,
        min:1
    },
    present:{
        type : Number,
        required: true,
        min:0
    },
    genre:{
        type : [String],
        required: true,
        lowercase: true
    }

})

module.exports=mongoose.model('Books',BookSchema)
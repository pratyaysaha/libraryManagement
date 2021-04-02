const mongoose=require('mongoose')


const BookSchema=mongoose.Schema({
    isbn:{
        type : Number,
        required: true,
        unique : true
    },
    name:{
        type : String,
        required: true
    },
    publisher:{
        type : String,
        required: true
    },
    author:{
        type: [String],
        required: true
    },
    price:{
        type : Number,
        required: true
    },
    yop:{
        type: Number,
        required : true
    },
    edition: {
        type : Number,
        default : 1
    },
    total:{
        type : Number,
        required: true
    },
    present:{
        type : Number,
        required: true
    },
    genre:{
        type : [String],
        required: true
    }

})

module.exports=mongoose.model('Books',BookSchema)
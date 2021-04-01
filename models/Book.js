const mongoose=require('mongoose')


const BookSchema=mongoose.Schema({
    isbn:{
        type : Number,
        required: true
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
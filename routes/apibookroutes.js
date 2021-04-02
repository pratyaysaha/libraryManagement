const { json } = require('express')
const express = require('express')
const Book= require('../models/Book')

const router=express.Router();

router.use(express.json())


//api routes
router.post('/', async (req,res)=>{
    
    const book=new Book({
        isbn : req.body.isbn,
        name : req.body.name,
        publisher: req.body.publisher,
        author: req.body.author,
        price : req.body.price,
        total : req.body.total,
        present : req.body.present,
        genre : req.body.genre,
        yop : req.body.yop,
        edition : req.body.edition
    })
    try{
        const bookAdd= await book.save()
        res.json(bookAdd)
    }
    catch(err){
        res.json({"status" : false, "error": err})
    }
})

router.get('/', async (req,res)=>{
    var q={}
    if(req.query.isbn)
    {
        const Query=await Book.find({'isbn':req.query.isbn})
        return res.json(Query)
    }
    if(req.query.name)
        q.name={'$regex' : req.query.name ,'$options' : 'i' }
    if(req.query.publisher)
        q.publisher={'$regex' : req.query.publisher ,'$options' : 'i'}
    if(req.query.price)
        q.price=req.query.price
    if(req.query.genre)
        q.genre={'$in':req.query.genre.split(',')}
    if(req.query.author)    
        q.author={'$in':req.query.author.split(',')}
    if(req.query.yop)
        q.yop=req.query.yop
    if(req.query.edition)
        q.edition=req.query.edition
    if(req.query.startYop)
        q.yop={'$gte' : req.query.startYop}
    console.log(q)
    try {
        const QueryResponse=await Book.find(q)
        res.json(QueryResponse)
    }
    catch(err){
        res.json({'status': false, 'error' : err})
    }
})

module.exports=router

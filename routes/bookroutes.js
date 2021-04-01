const { json } = require('express');
const express = require('express')
const Book= require('../models/Book')

const router=express.Router();

router.use(express.json())



//routes
//page routes
router.get('/',(req, res)=>{
    res.send("This is Home page")
})


//api routes
router.post('/api/book', async (req,res)=>{
    
    const book=new Book({
        isbn : req.body.isbn,
        name : req.body.name,
        publisher: req.body.publisher,
        author: req.body.author,
        price : req.body.price,
        total : req.body.total,
        present : req.body.present,
        genre : req.body.genre
    })
    const bookAdd= await book.save()
    res.json(bookAdd)
})

router.get('/api/book', async (req,res)=>{
    var q={}
    if(req.query.isbn)
    {
        const Query=await Book.find({'isbn':req.query.isbn})
        return res.json(Query)
    }
    if(req.query.name)
        q.name=req.query.name
    if(req.query.publisher)
        q.publisher=req.query.publisher
    if(req.query.price)
        q.price=req.query.price
    if(req.query.genre)
        q.genre={'$in':req.query.genre.split(',')}
    if(req.query.author)
        q.author={'$in':req.query.author.split(',')}
    console.log(q)

    const QueryResponse=await Book.find(q)
    res.json(QueryResponse)
})




module.exports=router
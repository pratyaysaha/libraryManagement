const { json } = require('express')
const express = require('express');
const { set } = require('mongoose');
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
        const Query=await Book.findOne({'isbn':req.query.isbn})
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


router.patch('/', async (req,res)=>{
    var setCondn={}
    console.log(req.body)
    if(req.query.isbn)
    {
        setCondn.isbn=req.query.isbn
    }
    var setQuery={}
    if(req.body.name)
        setQuery.name=req.body.name
    if(req.body.publisher)
        setQuery.publisher=req.body.publisher
    //update the whole author 
    if(req.body.author)
        setQuery.author=req.body.author
    if(req.body.price)
        setQuery.price=req.body.price
    if(req.body.yop)
        setQuery.yop=req.body.yop
    if(req.body.edition && req.body.edition>0)
        setQuery.edition=req.body.edition
    //whole genre change
    if(req.body.genre)
        setQuery.genre=req.body.genre    
    //add genre or author
    if(req.body.addgenre || req.body.addauthor)
        setQuery.$push={}
    if(req.body.addauthor)
        setQuery.$push.author= {'$each': req.body.addauthor}
    if(req.body.addgenre)
        setQuery.$push.genre={'$each' : req.body.addgenre}
    //romove a or many author or genre
    if(req.body.removeauthor || req.body.removegenre)
        setQuery.$pull={}
    if(req.body.removeauthor)
        setQuery.$pull.author={'$all' : req.body.removeauthor }
    if(req.body.removegenre)
        setQuery.$pull.genre={'$all' : req.body.removegenre }
    //increment the quantity of books present
    //use (+) for increment and (-) for decrement 
    if(req.body.quantity)
        setQuery.$inc={'total' : req.body.quantity, 'present' : req.body.quantity }
    console.log(setCondn);
    console.log(setQuery)
    try{
        const bookUpdate= await Book.updateOne(setCondn,setQuery)
        res.json({'status' : bookUpdate.ok, 'data' : await Book.findOne(setCondn) })
    }
    catch(err){
        res.json({'status' : false , 'error': err ,'data' : setQuery})
    }

})

module.exports=router

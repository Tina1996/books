const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requreLogin = require('../middleware/requreLogin')
const User = mongoose.model('User')
const Book = mongoose.model('Book')


router.get('/user/:id',(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Book.find({postedBy:req.params.id})
        .exec((err,books)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            else{
                return res.json({user,books})
            }
        })
    })
})

router.get('/getCart',requreLogin,(req,res)=>{
    Book.find({_id:{$in:req.user.cart}})
    .then(books=>{     
        var total = 0
        books.map(book=>{
            return total = total + book.price
        })
        res.json({books,total})
    })
    .catch(err=>{
        console.log(err)
    })
})



router.put('/addToCart',requreLogin,(req,res)=>{
    // console.log(req.body.bookId)
    User.findByIdAndUpdate(req.user._id,{
        $push:{cart:req.body.bookId}
    },{
        new:true
    })
    .select("-password")
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
    
})

router.put('/removeFromCart',requreLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
        $pull:{cart:req.body.bookId}
    },{
        new:true
    })
    .select("-password")
    .then(result=>{
        // console.log(result)
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router
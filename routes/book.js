const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Book = mongoose.model("Book")
const User = mongoose.model("User")
const requireLogin = require('../middleware/requreLogin')

router.post('/sellBook',requireLogin,(req,res)=>{
    const {bookName,authorName,desc,bookImage,categories,price} = req.body
    if(!bookName || !authorName || !desc || !bookImage || !price){
        return res.status(422).json({error:"Please provide all fields"})
    }
    const book = new Book({
        bookName,
        authorName,
        desc,
        price:price,
        categories,
        bookImage,
        postedBy:req.user
    })
    book.save()
        .then(result=>{
            res.json({book:result})
        })
        .catch(err=>{
            console.log(err)
        })

})

router.get('/allBooks',(req,res)=>{
    Book.find()
        .then(books=>{
            res.json({books})
        })
        .catch(err=>{
            console.log(err)
        })
})

router.get('/myBooks',requireLogin,(req,res)=>{
    Book.find({postedBy:req.user._id})
    .then(books=>{
        res.json({books})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/book/:bookId',(req,res)=>{
    Book.findOne({_id:req.params.bookId})
    .populate("postedBy","_id firstName lastName address city state country pincode")
    .then(book=>{
        res.json({book})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/postedBy/:userId',(req,res)=>{
    Book.find({postedBy:req.params.userId})
    .then(books=>{
        res.json({books})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete('/deleteBook/:bookId',requireLogin,(req,res)=>{
    Book.findOne({_id:req.params.bookId})
    .exec((err,book)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        if(book.postedBy._id.toString() == req.user._id.toString()){
            book.remove()
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
        }
    })
})

router.put('/updateBook/:bookId',requireLogin,(req,res)=>{
    const {bookName,authorName,categories,desc} = req.body
    Book.findById(req.params.bookId)
    .exec((err,book)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            book.bookName = bookName
            book.authorName = authorName
            book.categories = categories
            book.desc = desc
            book.save()
            .then(updateBook=>{
                res.json(updateBook)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})


router.get('/category/:category',(req,res)=>{
    const {category} = req.params
    // console.log("name",category)
    Book.find({categories:{$in:category}})
    .then(books=>{
        // console.log(books)
        res.json({books})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/search',(req,res)=>{
    let pattern = new RegExp(req.body.query,"i")
    
    Book.find({ $or: [ { bookName:{$regex:pattern} }, { authorName:{$regex:pattern} } ] })
    .exec((err,book)=>{
        if(err){
            console.log(err)
        }
        else{
            User.findOne({ $or: [ { firstName:{$regex:pattern} }, { lastName:{$regex:pattern} } ,{ email:{$regex:pattern} },{ city:{$regex:pattern} } ,{ state:{$regex:pattern} },{ country:{$regex:pattern} },{ address:{$regex:pattern} }    ] })
            .then(user=>{
                if(user){
                    Book.find({postedBy:user._id})
                    .populate('postedBy',"firstName lastName email city state address")
                    .exec((err,userBook)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            return res.json({userBook})
                        }
                    })
                }
                else{
                    return res.json({book})
                }
            })
        }
    })
})



module.exports = router

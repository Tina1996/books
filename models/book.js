const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types


const bookSchema = new mongoose.Schema({
    bookName:{
        type:String,
        required:true
    },
    authorName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    categories:[{
        type:String
    }],
    bookImage:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Book",bookSchema)
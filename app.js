const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors')
const {MONGOURI} = require('./config/keys')
// const MONGOURI="mongodb://localhost:27017/bookSeize"
//k49xehL8UfXJQUqr

const PORT = process.env.PORT || 5000;

app.use(cors())
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("Connected to database 1")
})

mongoose.connection.on("error",(err)=>{
    console.log("Error in Connection",err)
})

require('./models/user')
require('./models/book')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/book'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Server Connected to PORT",PORT)
})
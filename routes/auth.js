const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
// const JWT_SECRETS = "anki";
const jwt = require('jsonwebtoken')
const {JWT_SECRETS} = require('../config/keys')

// router.get('/requireLogin',(req,res)=>{
//     const { authorization } = req.headers
//     //authorization =="Beware anki"
//     if(!authorization){
//         return res.status(401).json({error:"You must logged In"})
//     }
//     const token = authorization.replace("Beware ","")
//     jwt.verify(token,JWT_SECRETS,(err,payload)=>{
//         if(err){
//             return res.status(401).json({error:"You must logged In"})
//         }
//         console.log(payload)
//     })
// })

router.post('/signup',(req,res)=>{
    const {firstName,lastName,contactNo,password,email,address,city,state,country,pincode} = req.body
    if(!firstName || !lastName || !contactNo || !password || !email || !address || !city || !state || !country || !pincode){
        return res.status(422).json({error:"Please add all fields"})
    }
    User.findOne({email:email})
        .then(savedUser => {
           if(savedUser){
                return res.status(422).json({error:"User already exists"})
           }
           bcrypt.hash(password,12)
            .then(hashedPassword => {
                const user = new User({
                    firstName:firstName,
                    lastName,
                    email,
                    password:hashedPassword,
                    contactNo,
                    address,
                    city,
                    state,
                    country,
                    pincode
                })
                user.save()
                    .then(user=>{
                        res.json({message:"Saved Successfully"})
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    // console.log(email,password)
    if(!email || !password){
        return res.status(422).json({error:"Please provide all fields"})
    }
    
    User.findOne({email:email})
        .then(savedUser => {
            if(!savedUser){
                return res.status(422).json({error:"Invalid Credentials"})
            }
            bcrypt.compare(password,savedUser.password)
                .then(doMatch => {
                    if(doMatch){
                        const token = jwt.sign({_id:savedUser._id},JWT_SECRETS)
                        const {_id,firstName,lastName,email,contactNo,address,state,city,country,pincode,cart} = savedUser
                        res.json({token:token,
                            user:{firstName,lastName,email,contactNo,_id,address,state,city,country,pincode,cart}})
                    }
                    else{
                        return res.status(422).json({error:"Invalid email or password"})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        })
        .catch(err=>{
            console.log(err)
        })
})

module.exports = router 
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const JWT_SECRETS = "anki";
const User = mongoose.model("User")

module.exports = (req,res,next) => {
    const { authorization } = req.headers
    //authorization =="Beware anki"
    if(!authorization){
        return res.status(401).json({error:"You must logged In"})
    }
    const token = authorization.replace("Beware ","")
    jwt.verify(token,JWT_SECRETS,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must logged In"})
        }
        const {_id} = payload
        User.findById(_id)
            .then(userData=>{
                req.user = userData
                next()
            })
    })
}

const jwt = require('jsonwebtoken')
const User = require('../../../src/config/models/index').User

function verifyEmail(req,res,next){
    const token = req.body
    jwt.verify(token,proccess.env.EMAIL_SECRET,(err,payload)=>{
        if(err){
            if(err.name ===  'TokenExpiredError'){res.json({status:422,error:'token_exipred'})}
            else{res.json({error:'server_error',status:500})}
        }else{
        User.findOneAndUpdate({username:payload.username},
            {'$set':{
                'verified':true
            }},{strict:false,new:true},(err,doc)=>{
                if(err){
                    res.json({error:'server_error',status:500})
                }else if(doc){
                      req.body.username = payload.username
                      req.body.password = payload.password
                      next();
                }else{
                    res.json({
                        status:423,
                        msg:'no account exists'
                    })
                }
            })
     }
    })

}

module.exports = verifyEmail
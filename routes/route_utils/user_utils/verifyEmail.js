const jwt = require('jsonwebtoken')
const User = require('../../../src/config/models/index').User

function verifyEmail(req,res,next){
    if(!req.query.token && req.query.token.lenght < 20){
        res.json({status:423})
    }else{
    const token = req.query.token
    jwt.verify(token,process.env.EMAIL_SECRET,(err,payload)=>{
        if(err){
            if(err.name ===  'TokenExpiredError'){res.json({status:422,error:'token_exipred'})}
            else{res.json({error:'server_error',status:500})}
        }else{
        User.findOneAndUpdate({email:payload.email},
            {'$set':{
                'verified':true
            }},{strict:false,new:true},(err,doc)=>{
                if(err){
                    res.json({error:'server_error',status:500})
                }else if(doc){
                      req.body.email = payload.email
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
}

module.exports = verifyEmail
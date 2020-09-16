const jwt = require('jsonwebtoken')
const { User } = require('../../../src/config/models/index')

module.exports = (req,res,next) => {
    const { token } = req.body
    if(!token || token.length < 160 ){
        res.json({status:423})
    }else{
        jwt.verify(token,process.env.EMAIL_SECRET,(error,payload)=>{
            if(error){
                if(err.name ===  'TokenExpiredError'){res.json({status:423,error:'token_exipred'})}
                else{res.json({error:'server_error',status:500})}
            }else{
                req.body.email = payload.email
                req.body.password = payload.password
                User.findOneAndUpdate({email:req.body.email},
                    {'$set':{
                        'verified':true
                    }},{strict:false,new:true},(error,user)=>{
                        if(error){res.json({error:'server_error',status:500})}
                        else if(user){next()}
                        else{res.json({status:423,msg:'no account exists'})}
                    })
            }
        })
    }
}

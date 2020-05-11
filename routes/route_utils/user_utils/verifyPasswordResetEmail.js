const jwt = require('jsonwebtoken')

function verifyPwdResetEmail(req,res,next){
    jwt.verify(req.query.token,process.env.RESET_PWD_SECRET,(err,payload)=>{
        if(err){
            if(err.name === 'TokenExpiredError'){
                res.json({status:422,error:'token_expired'})
            }else{
                res.json({status:500,error:'server_error'})       
            }
        }else{
            res.json({status:200,email:payload.email})
        }
    })    
}

module.exports = verifyPwdResetEmail
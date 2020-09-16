const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    if(!req.body.token || req.body.token.length < 160){
        res.json({status:423,type:'Invalid Token'})
    }else{
        jwt.verify(req.body.token,process.env.RESET_PWD_SECRET,(err,payload)=>{
            if(err){
                if(err.name === 'TokenExpiredError'){
                    res.json({status:422,type:'Token Expired'})
                }else{
                    res.json({status:500,type:'Server Error'})       
                }
            }else{
                req.body.email = payload.email
                next()
            }
        })
    }
}


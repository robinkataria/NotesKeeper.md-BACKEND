const {User} = require('../../../src/config/models/index')
const {isEmail} = require('../../../src/utils/validations')

module.exports = (req,res,next) => {
    if(!req.body.email || !isEmail(req.body.email)){
        res.json({type:'Email Validation Failed',status:423})
    }else{
        User.findOne({email:req.body.email},{verified:1},(err,user)=>{
            if(err){res.json({type:'server_error',status:500})}
            else if(user){
                if(user.verified){
                    next()
                }else{ res.json({type:'User Not Verified',status:422})}
            }
            else{res.json({error:'User Doesnot Exists',status:401})}
        })
    }
}


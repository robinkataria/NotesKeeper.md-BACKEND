const { isEmail } = require('../../../src/utils/validations')
const { User } = require('../../../src/config/models')

module.exports = (req,res,next) => {
    if(!req.body.email || !isEmail(req.body.email)){
        res.json({status:423})
    }else{
        const {email} = req.body
        User.find({email},(err,user)=>{
            if(err){res.json({status:500})}
            else if(user){res.json({status:422})}
            else{res.json({status:200})}
        })
    }

}


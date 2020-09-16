
const User = require('../../../src/config/models/index').User
const { sendEmail } = require('../../../src/utils/mail')
const { passwordResetEmailTemplate } = require('../../../src/utils/mail/templates')
const jwt = require('jsonwebtoken')
const  { isEmail } = require('../../../src/utils/validations')

module.exports = (req, res, next) => {
    if(!req.body.email || !isEmail(req.body.email)){
        res.json({status:423})
    }else{
        User.findOne({ email: req.body.email}, {name:1,verified:1}, (error, user) => {
            if (error) { res.json({error: 'server_error',status:500}) }
            else if (user) {
                if(user.verified){
                    jwt.sign({email:req.body.email},process.env.RESET_PWD_SECRET,{expiresIn:600},(err,token)=>{
                        if(err){res.json({status:500})}
                        else{
                            res.json({status:200,msg:'Mail Sent'})
                            let promise = sendEmail(passwordResetEmailTemplate(req.body.email,user.name,token))
                            promise.then(result => {
                                //logging code
                            })
                            .catch(err => {
                                //logging code
                            })
                        }
                    })
                } else{ res.json({status: 423,msg:'Not Verified'}) }
            } else { res.json({msg: 'User Not Exist',status:423})}
        })
    }
}

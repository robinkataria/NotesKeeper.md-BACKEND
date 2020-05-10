
const User = require('../../../src/config/models/index').User
const mail = require('../../../src/utils/mail/index')
const passwordResetEmailTemplate = require('../../../src/utils/mail/templates/index').passwordResetEmailTemplate
const jwt =require('jsonwebtoken')

function passwordResetEmail(req, res, next) {
    User.findOne({ email: req.body.email}, {name:1,verified:1}, (err, doc) => {
        if (err) {
            res.json({
                error: 'server_error'
            })
        } else if (doc) {
            if(doc.verified){
                 jwt.sign({email:req.body.email},process.env.RESET_PWD_SECRET,{expiresIn:600},(err,token)=>{
                    if(err){res.json({status:500})}
                    else{
                        let promise = mail.sendEmail(passwordResetEmailTemplate(email,name,token))
                        promise.then(result=>res.json({status:200,msg:'mail sent'}))
                        .catch(err=>res.json({status:500}))
                    }
                })
            }else{
                 res.json({
                        status: 423
                    })
            }
        } else {
            res.json({
                error: 'NO user exist with this registered email',
                status:422
            })
        }
    })
}

module.exports = passwordResetEmail
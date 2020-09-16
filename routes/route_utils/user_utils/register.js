const { User } = require('../../../src/config/models/index')
const mail = require('../../../src/utils/mail/index')
const { verifyEmailTemplate } = require('../../../src/utils/mail/templates/index')
const jwt = require('jsonwebtoken')
const { isEmail } = require('../../../src/utils/validations')

module.exports = (req, res, next) => {
    if (!req.body.email || !isEmail(req.body.email)) {
        res.json({status: 423,type:'Email Validation failed'})
    }else if(!req.body.password || req.body.password.length < 8){
        res.json({status: 423,type:'Password Validation failed'})
    }else if(!req.body.name || req.body.name.length < 3){
        res.json({status: 423,type:'Name Validation failed'})
    }
    else {
        const { name, password, email } = req.body
        User.register({
            name,
            email,
            verified: false,
            status: 'IA'
        }, password, (err, user) => {
            if (err) {
                if (err.name === 'UserExistsError') {
                    res.json({ type:'Account Already Exist',status: 401})
                } else {
                    res.json({msg: 'Server Error',status: 500});
                }
            } else {
                jwt.sign({
                    email:req.body.email,
                    password:req.body.password
                }, process.env.EMAIL_SECRET, {
                    expiresIn: '1h'
                }, (err, token) => {
                    if (err) {
                        res.json({status: 500,type: 'Server Error'})
                    } else {
                        res.json({status: 200,msg: 'mail sent'})
                        let promise = mail.sendEmail(verifyEmailTemplate(req.body.email, req.body.name, token))
                        promise.then(result => {
                            console.log(result)
                            //logging code 
                        })
                        .catch(err => {
                            //logging code
                        })
                    }
                })

            }
        })
    }
}
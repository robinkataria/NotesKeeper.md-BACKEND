const User = require('../../../src/config/models/index')
const mail = require('../../../src/utils/mail/index')
const verifyEmailTemplate = require('../../../src/utils/mail/templates/index').verifyEmailTemplate
const jwt =require('jsonwebtoken')

function register(req, res, next) {
    const {
        name,
        password,
        email
    } = req.body
    User.register({
        name,
        email,
        verified: false,
        status: 'IA',
        notebooks: [],
        todos: []
    }, password, (err, account) => {
        if(err){
            if(err.name === 'UserExistsError'){
                        res.json({msg:err.name,status:401});
                    }else{
                        res.json({msg:err,status:500});
                    } 
        }else{
            jwt.sign({email,password},process.env.EMAIL_SECRET,{expiresIn:'1h'},(err,token)=>{
                if(err){res.json({status:500})}
                else{
                    let promise = mail.sendEmail(verifyEmailTemplate(email,name,token))
                    promise.then(result=>res.json({status:200,msg:'mail sent'}))
                    .catch(err=>res.json({status:500}))
                }
            })
            
        }
    })
}

module.exports = register
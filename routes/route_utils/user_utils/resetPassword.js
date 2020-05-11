const User = require('../../../src/config/models/index').User

function resetPassword(req,res,next){
    if(!req.body.email && !req.body.new_password){
        res.json({status:423})
    }else{
        const {email,new_password} = req.body
        User.findOne({email})
        .then((user)=>{
            user.setPassword(new_password,(err,u)=>{
                if(err){
                    res.json({status:500})
                }else{
                    u.save(()=>{
                        req.body.password = new_password
                        next()
                    }) 
                }
            })
        }).catch(err=>{
            res.json({status:500})
        })
    }
}

module.exports = resetPassword
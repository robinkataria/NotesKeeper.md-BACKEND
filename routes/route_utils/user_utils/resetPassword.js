const { User } = require('../../../src/config/models/index')

module.exports = (req,res,next) => {
    if(!req.body.password || req.body.password.length < 8){
        res.json({status:423,type:'Password Validation Failed'})
    }else{
        
        User.findOne({email:req.body.email})
        .then((user)=>{
            user.setPassword(req.body.password,(err,updatedUser)=>{
                if(err){res.json({status:500})
                }else{
                    updatedUser.save(()=> res.json({status:200,msg:'Password Updated'}))
                }
            })
        }).catch(err =>{res.json({status:500})})
    }
}


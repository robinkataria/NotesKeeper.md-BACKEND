const User = require('../../../src/config/models/index').User

function readAllNotebooks(req,res,next){
User.findOne({_id:req.user._id},{notebooks:1},(err,user)=>{
    if(err){res.json({status:500})}
    else if(user){
        res.json({status:200,notebooks:user.notebooks})
    }
    else{res.json({status:401})}
})
}

module.exports = readAllNotebooks
const User = require('../../../src/config/models/index').User

function readAllNotebooks(req,res,next){
User.findOne({user_id:req.user._id},{notebooks:1,_id:0},(err,notebooks)=>{
    if(err){res.json({status:500})}
    else if(notebooks){
        res.json({status:200,notebooks})
    }
    else{res.json({status:401})}
})
}

module.exports = readAllNotebooks
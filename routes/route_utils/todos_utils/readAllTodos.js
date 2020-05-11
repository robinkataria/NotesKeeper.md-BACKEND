
const User = require('../../../src/config/models/index').User

function readAllTodos(req,res,next){
    User.findOne({_id:req.user._id},{todos:1},(err,user)=>{
        if(err){
            res.json({status:500})
        }else{
            res.json({status:200,todos:user.todos})
        }
    })
}

module.exports = readAllTodos

const User = require('../../../src/config/models/index').User

function readAllTodos(req,res,next){
    User.find({user_id:req.user._id},{todos:1,_id:0},(err,resultarray)=>{
        if(err){
            res.json({status:500})
        }else{
            res.json({status:200,todos:resultarray})
        }
    })
}

module.exports = readAllTodos
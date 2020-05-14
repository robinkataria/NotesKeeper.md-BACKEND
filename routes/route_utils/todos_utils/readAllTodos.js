
const Todo = require('../../../src/config/models/index').Todo

function readAllTodos(req,res,next){
    Todo.find({user_id:req.user._id},{user_id:0,items:0},(err,todos)=>{
        if(err){
            res.json({status:500})
        }else if(todos){
            res.json({status:200,todos})
        }else{
             res.json({status:500})
        }
    })
}

module.exports = readAllTodos
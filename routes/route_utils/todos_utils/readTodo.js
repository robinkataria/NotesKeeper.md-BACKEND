const Todo = require('../../../src/config/models/index').Todo

function readTodo(req,res,next){
    const notebook_id = req.body
    Todo.find({user_id:req.user._id,_id:todo_id},{user_id:0},(err,todo)=>{
        if(err){res.json({status:500})}
        else{
            res.json({status:200,listobject:todo})
        }
    })
}

module.exports = readTodo
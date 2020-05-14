const Todo = require('../../../src/config/models/index').Todo

function readTodo(req,res,next){
    if(!req.body.todo_id){
        res.json({status:422})
    }else{
        const todo_id = req.body.todo_id
        Todo.findOne({user_id:req.user._id,_id:todo_id},{user_id:0},(err,todolist)=>{
            if(err){res.json({status:500})}
            else if(todolist){
                res.json({status:200,todolist})
            }else{
                res.json({status:401})
            }
        })
    }
}

module.exports = readTodo
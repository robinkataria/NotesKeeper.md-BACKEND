const Todo = require('../../../src/config/models/index').Todo

function deleteAllItems(req,res,next){
    if(!req.body.todo_id){
        res.json({status:423})
    }else{
        const {todo_id} = req.body
        Todo.findOneAndUpdate({user_id:req.user._id,_id:todo_id},{$set:{
            items:[],total_tasks:0,completed_tasks:0
        }},{new:true,strict:false},(err,todolist)=>{
            if(err){res.json({status:500})}
            else if(todolist){
                res.json({status:200,todolist})
            }else{
                res.json({status:401})
            }
        })
    }
}

module.exports = deleteAllItems
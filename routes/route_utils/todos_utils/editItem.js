const Todo = require('../../../src/config/models/index').Todo

function editItem(req,res,next){
    if(!req.body.todo_id && !req.body.task_id && !req.body.title){
        res.json({status:423})
    }else{
        const {todo_id,task_id,title,Time,description} = req.body
        Todo.findOneAndUpdate({user_id:req.user._id,_id:todo_id},{
            $set:{
                'items.$[n].title':title,
                'items.$[n].description':description || '',
                'items.$[n].Time':Time,
            }
        },{new:true,strict:false,
        arrayFilters:[{'n._id':task_id}]},(err,todolist)=>{
            if(err){res.json({status:500})}
            else if(todolist){
                res.json({status:200,todolist})
            }else{
                res.json({status:401})
            }
        })
    }
}

module.exports = editItem
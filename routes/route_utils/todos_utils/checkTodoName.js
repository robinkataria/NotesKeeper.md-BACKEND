
const Todo = require('../../../src/config/models/index').Todo

function checkTodoName(req,res,next){
    if(!req.body.name && typeof req.body.name === 'object'){
        res.json({status:423})
    }else{
        Todo.find({user_id:req.user._id,name:req.body.name},(err,todos)=>{
            if(err){res.json({status:500});console.log(err)}
            else if(todos.length > 0){res.json({status:422})}
            else{
                next()
            }
        })
    }
}

module.exports = checkTodoName
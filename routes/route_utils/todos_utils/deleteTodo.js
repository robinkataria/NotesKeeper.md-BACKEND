const models = require('../../../src/config/models/index')
const User = models.User
const Todo = models.Todo

function deleteTodo(req,res,next){
    if(!req.body.id){
        res.json({status:423})
    }else{
    const id = req.body.id
    Todo.findOneAndDelete({user_id:req.user._id,_id:id},(err,document)=>{
        if(err){res.json({status:500})}
        else{
            User.findOneAndUpdate({_id:req.user._id},{$pull:{
                'todos':{id:document._id}
            }},{new:true,strict:true},(err,userdoc)=>{
                if(err){res.json({status:500});console.log(err)}
                else{
                    res.json({status:200,todos:userdoc.todos})
                }
            })
        }
    })
}
}

module.exports = deleteTodo
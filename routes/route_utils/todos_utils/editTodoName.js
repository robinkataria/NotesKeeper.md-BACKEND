const models = require('../../../src/config/models/index')
const User = models.User
const Todo = models.Todo

function editTodoName(req,res,next){
    const {id,new_name} = req.body
    Todo.findOneAndUpdate({user_id:req.user._id,_id:id},{$set:{
        name:new_name
    }},(err,document)=>{
        if(err){res.json({status:500})}
        else{
            User.findOneAndUpdate({_ud:req.user._id},{$set:{
                'todos.$[n].name':new_name
            }},{
                new:true,strict:false,
                arrayFilters:[{'n.id':document.id}]
            },(err,userdoc)=>{
                if(err){res.json({status:500})}
                else{
                    res.json({status:200,todos:userdoc.todos})
                }
            })
        }
    })
}

module.exports = editTodoName
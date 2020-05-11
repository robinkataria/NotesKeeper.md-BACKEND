const models = require('../../../src/config/models/index')
const User = models.User
const Todo = models.Todo

function editTodoName(req,res,next){
    if(!req.body.id && !req.body.name){
        res.json({status:423})
    }else{
        const {id,name} = req.body
        Todo.findOneAndUpdate({user_id:req.user._id,_id:id},{$set:{
            name:name
        }},(err,document)=>{
            if(err){res.json({status:500})}
            else{
                User.findOneAndUpdate({_id:req.user._id},{$set:{
                    'todos.$[n].name':name
                }},{
                    new:true,strict:false,
                    arrayFilters:[{'n.id':document._id}]
                },(err,userdoc)=>{
                    if(err){res.json({status:500})}
                    else{
                        res.json({status:200,todos:userdoc.todos})
                    }
                })
            }
        })
    }
}

module.exports = editTodoName
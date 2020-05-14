const models = require('../../../src/config/models/index')

const Todo = models.Todo

function deleteTodo(req,res,next){
    if(!req.body.id){
        res.json({status:423})
    }else{
    const id = req.body.id
    Todo.findOneAndDelete({user_id:req.user._id,_id:id},(err,document)=>{
        if(err){res.json({status:500})}
        else{
            next()
        }
    })
}
}

module.exports = deleteTodo
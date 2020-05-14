const Todo = require('../../../src/config/models/index').Todo

function searchTodos(req,res,next){
    if ( !req.body.query) {
        res.json({
            status: 423
        })
    } else {
        const {query} = req.body
        const regex = new RegExp(query,'i')
        Todo.find({user_id:req.user._id,name:{$regex:regex}},{user_id:0}
            ,(err,todos)=>{
                if(err){res.json({status:500})}
                else if(todos){
                    res.json({status:200,todos})
                }else{
                    res.json({status:401})
                }
            })
    }
}

module.exports = searchTodos
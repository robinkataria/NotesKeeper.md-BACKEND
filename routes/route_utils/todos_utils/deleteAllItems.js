const Todo = require('../../../src/config/models/index').Todo

function deleteAllItems(req,res,next){
    if(!req.body.id){
        res.json({status:423})
    }else{
        const {id} = req.body
        Todo.findOneAndUpdate({user_id:req.user._id,_id:id},{$set:{
            items:[]
        }},(err,document)=>{
            if(err){res.json({status:500})}
            else if(document){
                res.json({status:200,items:[]})
            }else{
                res.json({status:401})
            }
        })
    }
}

module.exports = deleteAllItems
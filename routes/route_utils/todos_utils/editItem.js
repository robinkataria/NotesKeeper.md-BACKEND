const Todo = require('../../../src/config/models/index').Todo

function editItem(req,res,next){
    const {id,item_id,new_title,new_description} = req.body
    Todo.findOneAndUpdate({user_id:req.user._id,_id:id},{
        $set:{
            'items.$[n]':{title:new_title,
            description:new_description}
        }
    },{new:true,
    arrayFilters:[{'n._id':item_id}]},(err,document)=>{
        if(err){res.json({status:500})}
        else if(document){
            res.json({status:200,items:document.items})
        }else{
            res.json({status:401})
        }
    })
}

module.exports = editItem
const models = require('../../../src/config/models/index')
const User = models.User
const Notebook = models.Notebook

function deleteNotebook(req,res,next){
    if(!req.body.notebook_id){
        res.json({status:423})
    }else{
        const {notebook_id} = req.body
        Notebook.findOneAndDelete({_id:notebook_id,user_id:req.user._id},(err,notebook)=>{
            if(err){res.json({status:500})}
            else if(notebook){
            User.findOneAndUpdate({_id:req.user._id},{
                $pull:{
                    'notebooks':{id:notebook._id}
                }
            },{new:true,strict:false},(err,userdoc)=>{
                if(err){res.json({status:500})}
                else if(userdoc){
                        res.json({status:200,notebooks:userdoc.notebooks})
                }else{
                    res.json({status:401})
                }
            })
            }
            else{res.json({status:401})}
        })
    }
}

module.exports = deleteNotebook
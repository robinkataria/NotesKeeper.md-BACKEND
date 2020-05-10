const models = require('../../../src/config/models/index')
const User = models.User
const Notebook = models.Notebook

function editNotebookName(req,res,next){
    const {notebook_id,name} = req.body
    Notebook.findOneAndUpdate({user_id:req.user._id,_id:notebook_id},{$set:{
        name:new_name
    }},{new:true,strict:false},(err,notebook)=>{
        if(err){res.json({status:500})}
        else if(notebook){
            User.findOneAndUpdate({_id:req.user._id},{$set:{
                'notebooks.$[n].name':new_name
            }},{new:true},(err,userdoc)=>{
                if(err){
                     res.json({status:500})
                }else if(userdoc){
                     res.json({status:200,notebooks:userdoc.notebooks})
                }else{
                    res.json({status:401})
                }
            })
        }
        else{res.json({status:401})}
    })
}

module.exports = editNotebookName
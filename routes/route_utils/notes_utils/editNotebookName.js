const models = require('../../../src/config/models/index')
const Notebook = models.Notebook

function editNotebookName(req,res,next){
    if(!req.body.notebook_id && !req.body.name ){
        res.json({status:423})
    }else{
    const {notebook_id,name} = req.body
    Notebook.findOneAndUpdate({user_id:req.user._id,_id:notebook_id},{$set:{
        name:name
    }},{new:true,strict:false},(err,notebook)=>{
        if(err){res.json({status:500})}
        else if(notebook){
            next()
        }
        else{res.json({status:401})}
    })
}
}

module.exports = editNotebookName
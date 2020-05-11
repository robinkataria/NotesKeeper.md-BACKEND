const Notebook = require('../../../src/config/models/index').Notebook

function readNotebook(req,res,next){
    if(!req.body.notebook_id){
        res.json({status:423})
    }else{
        const {notebook_id}=req.body
        Notebook.findOne({_id:notebook_id,user_id:req.user._id},{user_id:0},(err,notebook)=>{
            if(err){res.json({status:500})}
            else if(notebook){res.json({status:200,notebook})}
            else{res.json({status:401})}
        })
    }
}

module.exports = readNotebook
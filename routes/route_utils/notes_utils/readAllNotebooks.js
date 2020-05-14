const Notebook = require('../../../src/config/models/index').Notebook

function readAllNotebooks(req,res,next){
Notebook.find({user_id:req.user._id},{user_id:0},(err,notebooks)=>{
    if(err){res.json({status:500})}
    else if(notebooks){
        res.json({status:200,notebooks})
    }
    else{res.json({status:401})}
})
}

module.exports = readAllNotebooks
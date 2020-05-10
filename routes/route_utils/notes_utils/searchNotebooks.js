const Notebook = require('../../../src/config/models/index').Notebook

function searchNotebook(req,res,next){
    const query = req.body
    const regex = new RegExp(query,'i')
    Notebook.find({user_id:req.user._id,name:{$regex:regex}},
        {name:1},
        (err,notebooks)=>{
        if(err){res.json({status:500})}
        else if(notebooks){res.json({status:200,notebooks})}
        else{res.json({status:401})}
    })
}

module.exports = searchNotebook
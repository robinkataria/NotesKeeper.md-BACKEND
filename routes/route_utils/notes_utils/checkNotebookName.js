const Notebook = require('../../../src/config/models/index').Notebook

function checkNotebookName(req,res,next){
    if(!req.body.name){
        res.json({status:423})
    }else{
        const {name} =  req.body
        Notebook.find({user_id:req.user._id,name},(err,document)=>{
            if(err){req.json({status:500})}
            else if(document.length >0){
                res.json({status:422,msg:'notebook with this name already exist'})
            }else{
                next()
            }
        })
    }
}

module.exports = checkNotebookName
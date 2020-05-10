const Notebook = require('../../../src/config/models/index').Notebook

function checkNotebookName(req,res,next){
    const {name} =  req.body
    Note.find({user_id:req.user._id,name},(err,document)=>{
        if(err){req.json({status:500})}
        else if(document){
            res.json({status:422,msg:'notebook with this name already exist'})
        }else{
            next()
        }
    })
}

module.exports = checkNotebookName
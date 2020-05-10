const Note = require('../../../src/config/models/index').Note

function checkNoteName(req,res,next){
    const {name,notebook_id} =  req.body
    Note.find({user_id:req.user._id,notebook_id,name},(err,document)=>{
        if(err){req.json({status:500})}
        else if(document){
            res.json({status:422,msg:'note with this name already exist'})
        }else{
            next()
        }
    })
}

module.exports = checkNoteName
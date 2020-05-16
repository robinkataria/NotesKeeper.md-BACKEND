const Note = require('../../../src/config/models/index').Note

function checkNoteName(req,res,next){

    if(!req.body.name && !req.body.notebook_id){
            res.json({status:423})
    }else{
    const {name,notebook_id,onlydata} =  req.body
    if(onlydata){
        next()
    }else{
        Note.find({user_id:req.user._id,notebook_id,name},(err,document)=>{
            if(err){req.json({status:500})}
            else if(document.length > 0){
                res.json({status:422,msg:'note with this name already exist'})
            }else{
                next()
            }
        })
    }
}
}

module.exports = checkNoteName
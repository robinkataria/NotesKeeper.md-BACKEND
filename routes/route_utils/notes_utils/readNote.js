const Note = require('../../../src/config/models/index').Note

function  readNote(req,res,next){
    if(!req.body.notebook_id && !req.body.note_id){
        res.json({status:423})
    }else{
        const {notebook_id,note_id} = req.body
        Note.findOne({user_id:req.user._id,notebook_id,_id:note_id}
            ,{user_id:0,notebook_id:0}
            ,(err,note)=>{
            if(err){res.json({status:500})}
            else if(note){
                res.json({status:200,note:note})
            }else{res.json({status:401})}
        })
    }
}

module.exports = readNote
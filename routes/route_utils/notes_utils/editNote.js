const models = require('../../../src/config/models/index')
const Note = models.Note
const Notebook = models.Notebook

function editNote(req,res,next){
    if(!req.body.notebook_id && !req.body.note_id && !req.body.name){
        res.json({status:423})
    }else{
     const {notebook_id,note_id,name,data,message} = req.body
     Note.findOneAndUpdate({_id:note_id,user_id:req.user._id,notebook_id},
        {$set:{
            name:name,
            data:data || '',
            commit_message:message || '',
        }},{new:true,strict:false},
        (err,note)=>{
         if(err){res.json({status:500})}
         else if(note){
            next()
        }else{res.json({status:401})}
     })
    }
}

module.exports = editNote
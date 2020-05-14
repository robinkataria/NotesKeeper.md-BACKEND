const  models = require('../../../src/config/models/index')
const Note = models.Note
const Notebook = models.Notebook

function deleteNote(req,res,next){
    if(!req.body.note_id && !req.body.notebook_id){
        res.json({status:423})
    }else{
        const {note_id,notebook_id} = req.body
        Note.findOneAndDelete({_id:note_id,notebook_id,user_id:req.user._id},(err,note)=>{
            if(err){res.json({status:500})}
            else if(note){
               next()
            }else{
                res.json({status:401})
            }
        })
    }
}
module.exports = deleteNote
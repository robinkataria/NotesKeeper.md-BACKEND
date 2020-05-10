const  models = require('../../../src/config/models/index')
const Note = models.Note
const Notebook = models.Notebook

function deleteNote(req,res,next){
    const {note_id,notebook_id} = req.body
    Note.findOneAndDelete({_id:note_id,notebook_id,user_id:req.user._id},(err,note)=>{
        if(err){res.json({status:500})}
        else if(note){
            Notebook.findOneAndUpdate({user_id:req.user._id,_id:notebook_id},{$pull:{
                'notes.id':note_id
            }},{new:true},(err,notebook)=>{
                if(err){res.json({status:500})}
                else if(notebook){
                    res.json({status:200,notes:notebook.notes})
                }else{
                    res.json({status:401})
                }
            })   
        }else{
            res.json({status:401})
        }
    })
}
module.exports = deleteNote
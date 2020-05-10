const  models = require('../../../src/config/models/index')
const Note = models.Note
const Notebook = models.Notebook

function deleteMultipleNotes(req,res,next){
    const {deleteArray,notebook_id} = req.body
    Note.deleteMany({_id:{$in:deleteArray},notebook_id,user_id:req.user._id},(err)=>{
        if(err){res.json({status:500})}
        else{
            Notebook.findOneAndUpdate({user_id:req.user._id,_id:notebook_id},{$pull:{
                'notes.id':{$in:{deleteArray}}
            }},{new:true},(err,notebook)=>{
                if(err){res.json({status:500})}
                else if(notebook){
                    res.json({status:200,notes:notebook.notes})
                }else{
                    res.json({status:401})
                }
            })   
        }
    })
}
module.exports = deleteMultipleNotes
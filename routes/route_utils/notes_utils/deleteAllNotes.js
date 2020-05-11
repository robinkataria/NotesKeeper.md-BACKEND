const  models = require('../../../src/config/models/index')
const Note = models.Note
const Notebook = models.Notebook

function deleteAllNotes(req,res,next){
    if(!req.body.notebook_id){
        res.json({status:423})
    }else{
        const notebook_id = req.body.notebook_id
        Note.deleteMany({user_id:req.user._id,notebook_id},(err)=>{
            if(err){res.json({status:500})}
            else{
                Notebook.findOneAndUpdate({_id:notebook_id,user_id:req.user._id},{$set:{
                    notes:[]
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
}

module.exports = deleteAllNotes
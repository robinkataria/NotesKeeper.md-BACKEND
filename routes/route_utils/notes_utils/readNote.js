const models = require('../../../src/config/models/index')
const Notebook = models.Notebook
const Note = models.Note

function  readNote(req,res,next){
    if(!req.body.notebook_id && !req.body.note_id){
        res.json({status:423})
    }else{
        const {notebook_id,note_id} = req.body
        Notebook.findOne({user_id:req.user._id,_id:notebook_id},{name:1},(err,notebook)=>{
            if(err){res.json({status:err})}
            else if(notebook){
                 Note.findOne({user_id:req.user._id,notebook_id,_id:note_id}
                    ,{name:1,data:1,createdAt:1}
                    ,(err,note)=>{
                    if(err){res.json({status:500})}
                    else if(note){
                        res.json({status:200,note:{
                            notebook_name:notebook.name,
                            id:note._id,
                            name:note.name,
                            createdAt:note.createdAt,
                            data:note.data
                        }})
                    }else{res.json({status:401})}
                })
            }else{
                res.json({status:401})
            }
        })
    }
}

module.exports = readNote
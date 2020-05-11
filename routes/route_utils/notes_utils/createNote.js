const models = require('../../../src/config/models/index')
const Note = models.Note
const Notebook = models.Notebook

function createNote(req,res,next){

    if(!req.body.name && !req.body.notebook_id && !req.body.type){
        res.json({status:423})
    }else{
    const {name,notebook_id,description,type,data} = req.body
    if(type === 'db'){
        Note.create({
            user_id:req.user._id,
            name,notebook_id,type,
            data:data || '',
            description:description || ''
        },(err,note)=>{
            if(err){res.json({status:500})}
            else if(note){
                Notebook.findOneAndUpdate({_id:notebook_id},{$push:{
                    notes:{
                        name,
                        id:note._id
                    }
                }},{new:true},(err,notebook)=>{
                    if(err){res.json({status:500})}
                    else if(notebook){res.json({status:200,notes:notebook.notes})}
                    else{res.json({status:401})}
                })
            }else{
                res.json({status:401})
            }
        })
    }else{

    }
    }
}

module.exports = createNote
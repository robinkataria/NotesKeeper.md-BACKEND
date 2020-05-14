const models = require('../../../src/config/models/index')
const Note = models.Note
const Notebook = models.Notebook

function createNote(req,res,next){

    if(!req.body.name && !req.body.notebook_id && !req.body.type){
        res.json({status:423})
    }else{
    const {name,notebook_id,message,type,data} = req.body
    if(type === 'db'){
        Note.create({
            user_id:req.user._id,
            name,notebook_id,type,
            data:data || '',
            commit_message:message || ''
        },(err,note)=>{
            if(err){res.json({status:500})}
            else if(note){
                req.body.note_id = note._id
                next()
            }else{
                res.json({status:401})
            }
        })
    }else{

    }
    }
}

module.exports = createNote
const models = require('../../../src/config/models/index')
const Note = models.Note
const Notebook = models.Notebook

function editNote(req,res,next){
     const {notebook_id,note_id,name,new_data,new_description} = req.body
     Note.findOneAndUpdate({_id:note_id,user_id:req.user._id,notebook_id},
        {$set:{
            name:name,
            data:new_data || '',
            description:new_description || '',
        }},{new:true},
        (err,note)=>{
         if(err){res.json({status:500})}
         else if(note){
            Notebook.findOneAndUpdate({_id:notebook_id,user_id:req.user._id},{
                $set:{
                    'notes.$[n].name':name
                }
            },{new:true,arrayFilters:[{'n.id':note_id}]},
            (err,notebook)=>{
                if(err){res.json({status:500})}
                else if(notebook){
                    res.json({status:200,note})
                }else{
                    res.json({status:401})
                }
            })
        }else{res.json({status:401})}
     })
}

module.exports = editNote
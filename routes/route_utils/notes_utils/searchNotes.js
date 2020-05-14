const models = require('../../../src/config/models/index')
const Note = models.Note
const Notebook = models.Notebook

function searchNotes(req,res,next){
    if(!req.body.notebook_id && !req.body.query){
        res.json({status:423})
    }else{
        const {notebook_id,query} = req.body
        const regex = new RegExp(query,'i')
        Notebook.findOne({
            _id: notebook_id,
            user_id: req.user._id
        }, {
            user_id: 0
        }, (err, notebook) => {
            if (err) {
                res.json({
                    status: 500
                })
            } else if (notebook) {
                Note.find({name:{$regex:regex},notebook_id,user_id:req.user._id}
                ,{
                    name: 1,
                    createdAt: 1,
                    commit_message: 1
                },(err,notes)=>{
                    if(err){
                        res.json({status:500})
                    }else if(notes){
                        res.json({status:200,
                            notebook:{
                                name:notebook.name,
                                description:notebook.description,
                                notes
                            }
                        })
                    }else{
                        res.json({status:401})
                    }
                })
            }else{
                res.json({
                    status:401
                })
            }
        })
    }
}

module.exports = searchNotes
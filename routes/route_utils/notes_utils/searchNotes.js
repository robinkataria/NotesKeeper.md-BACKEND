const Note = require('../../../src/config/models/index').Note

function searchNotes(req,res,next){
    if(!req.body.notebook_id && !req.body.query){
        res.json({status:423})
    }else{
        const {notebook_id,query} = req.body
        const regex = new RegExp(query,'i')
        Note.find({name:{$regex:regex},notebook_id,user_id:req.user._id},{user_id:0},(err,result)=>{
            if(err){
                res.json({status:500})
            }else if(result){
                res.json({status:200,notes:result})
            }else{
                res.json({status:401})
            }
        })
    }
}

module.exports = searchNotes
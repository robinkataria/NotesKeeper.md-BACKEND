const models = require('../../../src/config/models/index')
const User = models.User
const Notebook = models.Notebook

function createNotebook(req,res,next){
    if(!req.body.name){
        res.json({status:423})
    }else{
        const {name,description} = req.body
        Notebook.create({name,description:description || '',notes:[],user_id:req.user._id},
        (err,notebook)=>{
            if(err){res.json({status:500});console.log(err)}
            else{
                User.findOneAndUpdate({_id:req.user._id},{$push:{
                    'notebooks':{
                        id:notebook._id,
                        name:notebook.name
                    }
                }},{new:true,strict:false},(err,document)=>{
                    if(err){res.json({status:500})}
                    else if(document){res.json({status:200,notebooks:document.notebooks})}
                    else{res.json({status:401})}
                })
            }
        })
    }
}

module.exports = createNotebook
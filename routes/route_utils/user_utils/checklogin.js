const  { User } = require('../../../src/config/models')

module.exports = (req,res,next) => {
 if(req.isAuthenticated()){
     User.findOne({_id:req.user._id},{email:1,name:1},(err,user)=>{
         if(err){
             res.json({status:500})
         }else if(user){
            res.json({status:200,logged_in:true,email:user.email,name:user.name})
         }else{
             res.json({status:401})
         }
     })
 }else{
     res.json({status:401})
 } 
}
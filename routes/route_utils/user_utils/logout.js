const User =  require('../../../src/config/models/index').User


module.exports = (req,res,next) => {
    if(req.isAuthenticated()){
        User.findOneAndUpdate({_id:req.user._id},{
            '$set':{status:'IA'}
        },{strict:false},(err)=>{
            if(err){
                res.json({error:'server_error',status:500})
            }else{
                req.logout()
                res.json({status:200,user:''})
            }
        })
    }else{
        res.json({status:401,msg:'Unauthorised'});
    }
}
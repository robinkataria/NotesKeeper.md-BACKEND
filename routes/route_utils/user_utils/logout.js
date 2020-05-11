const User =  require('../../../src/config/models/index').User


function logout(req,res,next){
    if(req.isAuthenticated()){
        User.findOneAndUpdate({_id:req.user._id},{
            '$set':{
                status:'IA'
            }
        },{strict:false},(err)=>{
            if(err){
                res.json({error:'server_error'})
            }else{
                 req.logout();
                res.json({status:200,user:''});
            }
        })
           
    }else{
            res.json({status:403,msg:'login first to logout'});
    }
}

module.exports = logout
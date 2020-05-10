const User =  require('../../../src/config/models/index').User


function logout(req,res,next){
    if(req.isAuthenticated()){
        User.findOneAndUpdate({username:req.user.username},{
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
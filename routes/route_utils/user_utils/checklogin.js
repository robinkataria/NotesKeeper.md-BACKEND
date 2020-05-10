function CheckLogin(req,res,next){
 if(req.isAuthenticated()){
     res.json({status:200,logged_in:true})
 }else{
     res.json({status:401})
 } 
}

module.exports = CheckLogin
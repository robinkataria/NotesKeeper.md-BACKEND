
const User = require('../../../src/config/models/index').User

function CheckEmail(req,res,next){
    const email = req.body
    User.find({email},(err,document)=>{
        if(err){res.json({status:500})}
        else if(document){res.json({status:422})}
        else{res.json({status:200})}
    })

}

module.exports = CheckEmail
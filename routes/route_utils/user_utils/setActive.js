const { User } = require('../../../src/config/models/index')

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        User.findOneAndUpdate({
            _id: req.user._id
        }, {
            '$set': {
                status: 'A'
            }
        }, {
            strict: false
        }, (err,doc) => {
            if (err) {
                res.json({
                    error: 'server_error',status:500
                })
            } else if(doc) {
                res.json({
                    status: 200,
                    email:doc.email,
                    name:doc.name,
                    logged_in:true,
                })
            }else{
                res.json({error:"User Doesn't Exists",status:422})
            }
        })
    } else {
        res.json({status:401,type:'Unauthenticated'})
    }
}
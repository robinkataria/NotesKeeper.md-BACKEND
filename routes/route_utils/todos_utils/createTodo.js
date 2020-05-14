const models = require('../../../src/config/models/index')
const Todo = models.Todo
const User = models.User


function createTodo(req,res,next) {
    if(!req.body.name){
        res.json({status:423})
    }else{
    const name = req.body.name
    Todo.create({
        user_id: req.user._id,
        name,
        notes: []
    }, (err, document) => {
        if (err) {
            res.json({
                status: 500
            })
        } else if(document) {
         next()  
        }else{
                 res.json({
                                status: 401
                            })
        }
    })
}
}

module.exports = createTodo
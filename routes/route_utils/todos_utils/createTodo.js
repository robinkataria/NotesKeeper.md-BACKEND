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
            console.log(err)
            res.json({
                status: 500
            })
        } else {
            User.findOneAndUpdate({
                _id: req.user._id
            }, {
                $push: {
                    'todos': {
                        name: document.name,
                        id: document._id
                    }
                }
            }, {
                new: true,
                strict: false
            }, (err, userdoc) => {
                if (err) {
                    res.json({
                        status: 500
                    })
                } else {
                    res.json({
                        staus: 200,
                        todos: userdoc.todos
                    })
                }
            })
        }
    })
}
}

module.exports = createTodo
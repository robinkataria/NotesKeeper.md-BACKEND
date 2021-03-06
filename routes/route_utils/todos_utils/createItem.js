const Todo = require('../../../src/config/models/index').Todo

function createItem(req, res, next) {
    if(!req.body.todo_id && !req.body.title ){
        res.json({status:423})
    }else{
    const {
        todo_id,
        title,
        description,
        Time
    } = req.body
    Todo.findOneAndUpdate({
        user_id: req.user._id,
        _id: todo_id
    }, {
        $push: {
            items: {
                title,
                description: description || '',
                Time:Time ,
                completed:false
            }
        },
        $inc:{
           total_tasks:1 
        }
    }, {
        new: true,
        strict: false
    }, (err, todolist) => {
        if (err) {
            res.json({
                status: 500
            })
        } else if (todolist) {
            res.json({
                status: 200,
                todolist
            })
        } else {
            res.json({
                status: 401
            })
        }
    })
}
}

module.exports = createItem
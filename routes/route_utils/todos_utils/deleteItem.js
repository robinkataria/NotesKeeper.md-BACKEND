const Todo = require('../../../src/config/models/index').Todo

function deleteItem(req, res, next) {
    if (!req.body.todo_id && !req.body.task_id) {
        res.json({
            status: 423
        })
    } else {
        const {
            todo_id,
            task_id
        } = req.body
        Todo.findOneAndUpdate({
            user_id: req.user._id,
            _id: todo_id
        }, {
            $pull: {
                'items': {
                    _id: task_id
                }
            },$inc:{total_tasks:-1}
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

module.exports = deleteItem
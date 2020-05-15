const Todo = require('../../../src/config/models/index').Todo

function deleteMultipleItems(req, res, next) {
    if (!req.body.todo_id && !req.body.completed && !req.body.delete_array && typeof delete_array !== 'array') {
        res.json({
            status: 423
        })
    } else {
        const {
            todo_id,
            delete_array,
            completed
        } = req.body
        Todo.findOneAndUpdate({
            user_id: req.user._id,
            _id: todo_id
        }, {
            $pull: {
                'items': {
                    _id: {
                        $in: delete_array
                    }
                }
            },
            $inc: {
                total_tasks: (-1 * (delete_array.length)),
                completed_tasks: (-1 * (completed))
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

module.exports = deleteMultipleItems
const Todo = require('../../../src/config/models/index').Todo

function searchItems(req, res, next) {
    if (!req.body.todo_id && !req.body.query) {
        res.json({
            status: 423
        })
    } else {
        const {
            todo_id,
            query
        } = req.body
        const regex = new RegExp(query, 'i')
        Todo.findOne({
                user_id: req.user._id,
                _id: todo_id
            }, {
               user_id:0
            },
            (err, todolist) => {
                if (err) {
                    res.json({
                        status: 500
                    })
                } else if (todolist) {
                    const searchResult = todolist.items.filter(item => {
                        if (regex.test(item.title) || regex.test(item.description)) {
                            return item
                        }
                    })
                    res.json({
                        status: 200,
                        todolist:{...todolist.toObject(),items:searchResult}
                    })
                } else {
                    res.json({
                        status: 401
                    })
                }
            })
    }
}

module.exports = searchItems
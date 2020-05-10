const Todo = require('../../../src/config/models/index').Todo

function searchItems(req, res, next) {
    const {
        id,
        query
    } = req.body
    const regex = new RegExp(query, 'i')
    Todo.findOne({
            user_id: req.user._id,
            _id: id
        }, {
            items: 1,
            _id: 0
        }, {},
        (err, document) => {
            if (err) {
                res.json({
                    status: 500
                })
            } else if (document) {
                const searchResult = document.items.map(item => {
                    if (regex.test(item.title) || regex.test(item.description)) {
                        return item
                    }
                })
                res.json({
                    status: 200,
                    items: searchResult
                })
            } else {
                res.json({
                    status: 401
                })
            }
        })
}

module.exports = searchItems
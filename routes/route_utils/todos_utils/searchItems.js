const Todo = require('../../../src/config/models/index').Todo

function searchItems(req, res, next) {
    if (!req.body.id && !req.body.query) {
        res.json({
            status: 423
        })
    } else {
        const {
            id,
            query
        } = req.body
        const regex = new RegExp(query, 'i')
        Todo.findOne({
                user_id: req.user._id,
                _id: id
            }, {
                items: 1
            },
            (err, document) => {
                if (err) {
                    res.json({
                        status: 500
                    })
                } else if (document) {
                    const searchResult = document.items.filter(item => {
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
}

module.exports = searchItems
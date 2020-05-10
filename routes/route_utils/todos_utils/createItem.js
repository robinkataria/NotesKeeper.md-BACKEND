const Todo = require('../../../src/config/models/index').Todo

function createItem(req, res, next) {
    const {
        id,
        title,
        description
    } = req.body
    Todo.findOneAndUpdate({
        user_id: req.user._id,
        _id: id
    }, {
        $push: {
            items: {
                title,
                description: description || ''
            }
        }
    }, {
        new: true,
        strict: false
    }, (err, document) => {
        if (err) {
            res.json({
                status: 500
            })
        } else if (document) {
            res.json({
                status: 200,
                items: document.items
            })
        } else {
            res.json({
                status: 401
            })
        }
    })
}

module.exports = createItem
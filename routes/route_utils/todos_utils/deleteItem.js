const Todo = require('../../../src/config/models/index').Todo

function deleteItem(req, res, next) {
    const {
        id,
        item_id
    } = req.body
    Todo.findOneAndUpdate({
        user_id: req.user._id,
        _id: id
    }, {
        $pull: {
            'items._id': item_id
        }
    }, {
        new: true
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

module.exports = deleteItem
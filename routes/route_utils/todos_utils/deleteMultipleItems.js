const Todo = require('../../../src/config/models/index').Todo

function deleteMultipleItems(req, res, next) {
    const {
        id,
        delete_array
    } = req.body
    Todo.findOneAndUpdate({
        user_id: req.user._id,
        _id: id
    }, {
        $pull: {
            'items._id': {
                $in: delete_array
            }
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

module.exports = deleteMultipleItems
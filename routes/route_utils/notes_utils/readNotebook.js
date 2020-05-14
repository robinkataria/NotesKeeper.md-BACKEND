const models = require('../../../src/config/models/index')
const Notebook = models.Notebook
const Note = models.Note

function readNotebook(req, res, next) {
    if (!req.body.notebook_id) {
        res.json({
            status: 423
        })
    } else {
        const {
            notebook_id
        } = req.body
        Notebook.findOne({
            _id: notebook_id,
            user_id: req.user._id
        }, {
            user_id: 0
        }, (err, notebook) => {
            if (err) {
                res.json({
                    status: 500
                })
            } else if (notebook) {
                Note.find({
                    notebook_id,
                    user_id: req.user._id
                }, {
                    name: 1,
                    createdAt: 1,
                    commit_message: 1
                }, (err, notes) => {
                    if (err) {
                        res.json({
                            status: 500
                        })
                    } else if (notes) {
                        res.json({
                            status: 200,
                            notebook: {
                                name: notebook.name,
                                description: notebook.description,
                                notes
                            }
                        })
                    } else {
                        res.json({
                            status: 401
                        })
                    }
                })
            } else {
                res.json({
                    status: 401
                })
            }
        })
    }
}

module.exports = readNotebook
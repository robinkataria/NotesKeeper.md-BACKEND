const User = require('../../../src/config/models/index').User

const validateVerify = (req, res, next) => {
    if (!req.body.email) {
        res.json({ error: 'missing_params', status: 423 })
    } else {
        User.findOne({ email: req.body.email }, { verified: 1 }, (err, doc) => {
            if (err) { res.json({ error: 'server_error', status: 500 }) }
            else if (doc) {
                if (doc.verified) {
                    next()
                } else {
                    res.json({ error: 'User Not Verified', status: 422 })
                }
            }
            else {
                res.json({ error: 'user doesnot exists', status: 401 })
            }
        })
    }
}

module.exports = validateVerify

// Search email in DB, if found, check whether verified or not. 
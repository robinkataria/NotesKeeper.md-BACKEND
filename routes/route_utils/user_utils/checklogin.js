const User = require('../../../src/config/models/index').User

function CheckLogin(req, res, next) {
    if (req.isAuthenticated()) {
        User.findOne({ _id: req.user._id }, { email: 1, name: 1 }, (err, user) => {
            if (err) {
                res.json({ status: 500 })
            } else if (user) {
                res.json({ status: 200, logged_in: true, email: user.email, name: user.name })
            } else {
                res.json({ status: 401 })
            }
        })
    } else {
        res.json({ status: 401 })
    }
}

module.exports = CheckLogin
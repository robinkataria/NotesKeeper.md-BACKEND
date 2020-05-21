const User = require('../../../src/config/models/index').User

function CheckEmail(req, res, next) {
    if (!req.body.email) {
        res.json({ status: 423 })
    } else {
        const { email } = req.body;
        User.find({ email }, (err, document) => {
            if (err) { res.json({ status: 500 }) }
            else if (document.length > 0) { res.json({ status: 422 }) }
            else { res.json({ status: 200 }) }
        })
    }
}

module.exports = CheckEmail
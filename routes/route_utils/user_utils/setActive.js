const User = require('../../../src/config/models/index').User

const setActive = (req, res, next) => {
    if (req.isAuthenticated()) {
        User.findOneAndUpdate(
            { _id: req.user._id },
            { '$set': { status: 'A' } },
            { strict: false },
            (err, doc) => {
                if (err) {
                    res.json({ error: 'server_error', status: 500 });
                } else if (doc) {
                    res.json({
                        status: 200,
                        email: doc.email,
                        name: doc.name,
                        logged_in: true,
                    })
                } else {
                    res.json({ error: 'no user exists', status: 401 });
                }
            }
        )
    } else {
        res.redirect('/login')
    }
}
module.exports = setActive
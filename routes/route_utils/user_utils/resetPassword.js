const User = require('../../../src/config/models/index').User

function resetPassword(req, res, next) {
    if (!req.body.email && !req.body.password) {
        res.json({ status: 423 });
    } else {
        const { email, password } = req.body;
        User.findOne({ email })
            .then((user) => {
                user.setPassword(password, (err, u) => {
                    if (err) {
                        res.json({ status: 500 })
                    } else {
                        u.save(() => next())
                    }
                })
            })
            .catch(err => res.json({ status: 500 }));
    }
}

module.exports = resetPassword
const passport = require('passport')
const CryPtStrategy = require('passport-crypt-oauth20')

const User = require('./models/index').User

passport.serializeUser((user, done) => {
    console.log('serialize', user.email)
    done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
        console.log('desiralize', user.email)
        done(null, user)
    })
})

passport.use(User.createStrategy())

passport.use(new CryPtStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/crypt/oauth/callback',
    scope: 'profile'
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.email }, (err, user) => {
            if (err) throw err
            else if (user) { return done(err, user) }
            else {
                User.create({
                    email: profile.email,
                    name: profile.name,
                    cryptId: profile.cryptId,
                    access_token: accessToken,
                    refersh_token: refreshToken,
                    verified: true,
                    status: 'A',
                }, (error, userdoc) => {
                    return done(error, userdoc)
                })
            }
        })
    }
));


module.exports = passport
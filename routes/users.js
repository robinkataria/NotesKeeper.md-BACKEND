const express = require('express');
const router = express.Router();
const passport = require('../src/config/userpassport');
const user = require('./route_utils/user_utils/index')

router.get('/', (req,res)=>res.json({msg:'welcome to node api backend'}))

router.route('/checklogin')
    .get(user.checkLogin)

router.route('/checkemail')
    .post(user.checkEmail)

router.route('/register')
    .post(user.register)

    ///change it in frontend
router.route('/verifyemail')
    .post(user.verifyEmail,
        passport.authenticate('local', {
            successRedirect: '/loginsuccess',
            failureRedirect: '/loginfail'
        }))

//Oauth using CryPt
router.route('/crypt/oauth/login')
    .get(passport.authenticate('crypt'))
 
router.route('/crypt/oauth/callback') 
    .get(passport.authenticate('crypt', { failureRedirect: '/crypt/fail',successRedirect:'/crypt/success' }))
 
router.get('/crypt/fail',(req,res)=>{
    res.status(301).redirect('http://localhost:3000')
})

router.get('/crypt/success',(req,res)=>{
    res.status(301).redirect('http://localhost:3000')
})

//local authentication
router.route('/login')
    .all(user.validateVerify,passport.authenticate('local', {
        successRedirect: '/loginsuccess',
        failureRedirect: '/loginfail'
    }))

router.route('/loginsuccess')
    .get(user.setActive)

router.route('/loginfail')
    .get((req, res) => res.json({status: 401,user: null}))

router.route('/forgotpassword')
    .post(user.passwordResetEmail)

router.route('/resetpassword')
    .post(user.verifyPasswordResetEmail,user.resetPassword)

router.route('/logout')
    .get(user.logout);


module.exports = router;

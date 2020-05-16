var express = require('express');
var router = express.Router();
const userpassport = require('../src/config/userpassport');
const user = require('./route_utils/user_utils/index')

router.get('/', (req,res)=>res.json({msg:'welcome to node api backend'}));

router.get('/favicon.ico',(req,res)=>res.status(204))

router.route('/checklogin')
    .get(user.checkLogin)

router.route('/checkemail')
    .post(user.checkEmail)

router.route('/register')
    .post(user.register)

    ///change it in frontend
router.route('/verifyemail')
    .post(user.verifyEmail,
        userpassport.authenticate('local', {
            successRedirect: '/loginsuccess',
            failureRedirect: '/loginfail'
        }))

//Oauth using CryPt
router.route('/crypt/oauth/login')
    .get(userpassport.authenticate('crypt'))
 
router.route('/crypt/oauth/callback') 
  .get(userpassport.authenticate('crypt', { failureRedirect: '/crypt/fail',successRedirect:'/crypt/success' }))
 
router.get('/crypt/fail',(req,res)=>{
 res.status(301).redirect('http://localhost:3000')
})

router.get('/crypt/success',(req,res)=>{
 res.status(301).redirect('http://localhost:3000')
})

//local authentication
router.route('/login')
    .all(user.validateVerify,userpassport.authenticate('local', {
        successRedirect: '/loginsuccess',
        failureRedirect: '/loginfail'
    }))

router.route('/loginsuccess')
    .get(user.setActive)

router.route('/loginfail')
    .get((req, res) => res.json({
        status: 401,
        user: null
    }))

router.route('/forgotpwd')
    .post(user.passwordResetEmail)

    //change in frontend
router.route('/resetpassword')
    .post(user.verifyPasswordResetEmail)

router.route('/changepassword')
    .post(user.resetPassword,
        userpassport.authenticate('local', {
            successRedirect: '/loginsuccess',
            failureRedirect: '/loginfail'
        }))

router.route('/logout')
    .get(user.logout);


module.exports = router;

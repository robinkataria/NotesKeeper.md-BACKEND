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

router.route('/vuemail')
    .post(user.verifyEmail,
        userpassport.authenticate('local', {
            successRedirect: '/loginsuccess',
            failureRedirect: '/loginfail'
        }))

//Oauth using CryPt
router.get('/crypt/oauth/login',userpassport.authenticate('crypt'))
 
router.get('/crypt/oauth/callback', 
  userpassport.authenticate('crypt', { failureRedirect: '/loginfail',successRedirect:'/loginsuccess' }))
 
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

router.route('/vpremail')
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

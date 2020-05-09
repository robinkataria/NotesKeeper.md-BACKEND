var express = require('express');
var router = express.Router();
const userpassport = require('../src/config/userpassport');
const user = require('./route_utils/user_utils/index')

router.get('/', (req,res)=>res.json({msg:'welcome to node api backend'}));

router.get('/favicon.ico',(req,res)=>res.status(204))

router.route('/checklogin')
    .get(user.CheckLogin)

router.route('/checkemail')
    .post(user.CheckEmail)

router.route('/register')
    .post(user.Register)

router.route('/vuemail')
    .post(user.VerifyEmail,
        userpassport.authenticate('local', {
            successRedirect: '/loginsuccess',
            failureRedirect: '/loginfail'
        }))

//Oauth using CryPt
app.get('/crypt/oauth/login',userpassport.authenticate('crypt'))
 
app.get('/crypt/oauth/callback', 
  userpassport.authenticate('crypt', { failureRedirect: '/loginfail',successRedirect:'/loginsuccess' }))
 
//local authentication
router.route('/login')
    .all(user.ValidateVerify,userpassport.authenticate('local', {
        successRedirect: '/loginsuccess',
        failureRedirect: '/loginfail'
    }))

router.route('/loginsuccess')
    .get(user.SetActive)

router.route('/loginfail')
    .get((req, res) => res.json({
        status: 401,
        user: null
    }))

router.route('/forgotpwd')
    .post(user.PasswordResetEmail)

router.route('/vpremail')
    .post(user.VerifyPasswordResetEmail)

router.route('/changepassword')
    .post(user.ResetPassword,
        userpassport.authenticate('local', {
            successRedirect: '/loginsuccess',
            failureRedirect: '/loginfail'
        }))

router.route('/logout')
    .get(user.Logout);


module.exports = router;

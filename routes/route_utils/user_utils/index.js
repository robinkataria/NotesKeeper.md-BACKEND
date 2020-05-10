const checkEmail = require('./checkemail')
const checkLogin = require('./checklogin')
const logout = require('./logout')
const passwordResetEmail = require('./passwordResetEmail')
const register = require('./register')
const resetPassword = require('./resetPassword')
const setActive =require('./setActive')
const validateVerify = require('./validateVerify')
const verifyEmail = require('./verifyEmail')
const verifyPasswordResetEmail = require('./verifyPasswordResetEmail')

module.exports = {
    checkEmail,
    checkLogin,
    setActive,
    logout,
    register,
    resetPassword,
    validateVerify,
    verifyEmail,
    verifyPasswordResetEmail,
    passwordResetEmail

}
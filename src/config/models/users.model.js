const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); 

const notebooksArraySchema = mongoose.Schema({
    name:{type:String,unique:true},
    id:{type:String,unique:true},
})

const userSchema = mongoose.Schema({
  email:{type:String,unique:true},//email is the username
  password:{type:String},
  cryptId:{type:String,unique:true},//feature for login using CryPt
  name:{type:Object},
  attempts:{type:Number},
  last:{type:String},
  verified:{type:Boolean},
  createdAt:{type:Date,default:Date.now},
  status:{type:String},
  notesBooks:[notebooksArraySchema]
})

const options = {
    maxInterval:60000,
    usernameField:'email',
    attemptsField:'attempts',
    lastLoginField:'last',
    usernameLowerCase:false,
    limitAttempts:true,
    maxAttempts:10,
}


userSchema.plugin(passportLocalMongoose,options);

const User = mongoose.model('users',userSchema);

module.exports = User;
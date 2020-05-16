const mongoose = require('mongoose')


const notebookSchema = mongoose.Schema({
user_id:{type:String,required:true},
name:{type:String,required:true},
description:{type:String},
createdAt:{type:Date,default:Date.now}
})

const Notebook = mongoose.model('notebooks',notebookSchema)

module.exports = Notebook
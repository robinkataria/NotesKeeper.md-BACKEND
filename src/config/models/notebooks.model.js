const mongoose = require('mongoose')

const notesArraySchema = mongoose.Schema({
    name:{type:String,required:true},
    id:{type:String}
})

const notebookSchema = mongoose.Schema({
user_id:{type:String,required:true},
name:{type:String,required:true},
description:{type:String},
createdAt:{type:Date,default:Date.now},
notes:[notesArraySchema]
})

const Notebook = mongoose.model('notebooks',notebookSchema)

module.exports = Notebook
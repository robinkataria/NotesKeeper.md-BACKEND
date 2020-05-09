const mongoose = require('mongoose')


const noteSchema = mongoose.Schema({
notebook_id:{type:String,required:true},
name:{type:String,required:true},
description:{type:String},
type:{type:String},//either db or file
data:{type:String},//null incase of file
createdAt:{type:Date,default:Date.now}
})

const Note = mongoose.model('notes',noteSchema)

module.exports = Note
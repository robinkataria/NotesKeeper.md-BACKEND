const mongoose = require('mongoose')

const itemsArraySchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String},
    completed:{type:Boolean},
    Time:{type:Date}
})

const todoSchema = mongoose.Schema({
name:{type:String,required:true},
user_id:{type:String,required:true},
createdAt:{type:Date,default:Date.now},
items:[itemsArraySchema],
total_tasks:{type:Number,default:0},
completed_tasks:{type:Number,default:0}
})

const Todo  = mongoose.model('todos',todoSchema)

module.exports = Todo
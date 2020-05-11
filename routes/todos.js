const express = require('express')
const todos  = require('./route_utils/todos_utils/index')
const router = express.Router()


//read all todo lists
router.route('/readalltodos')
.get(todos.readAllTodos)

//read a selected todo list
router.route('/readtodo')
.post(todos.readTodo)

//create atodo list
router.route('/createtodo')
.post(todos.checkTodoName,todos.createTodo)

//delete a todo list
router.route('/deletetodo')
.post(todos.deleteTodo)

//editname of todo list
router.route('/edittodoname')
.post(todos.checkTodoName,todos.editTodoName)

//search todos
router.route('/searchtodos')
.post(todos.searchTodos)

//item routes

//search items
router.route('/searchitems')
.post(todos.searchItems)

//create item
router.route('/createitem')
.post(todos.createItem)

//edit a item
router.route('/edititem')
.post(todos.editItem)

//delete a item
router.route('/deleteitem')
.post(todos.deleteItem)

//delete multiple items
router.route('/deletemultipleitems')
.post(todos.deleteMultipleItems)

//delete all items
router.route('/deleteallitems')
.post(todos.deleteAllItems)

module.exports = router
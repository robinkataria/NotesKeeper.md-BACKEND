const express = require('express')
const notes  = require('./route_utils/notes_utils/index')
const router = express.Router()



//items route
router.route('/searchnotebooks')
.post(notes.searchNotebooks)

//read all todo lists
router.route('/readallnotebooks')
.get(notes.readAllNotebooks)

//read a selected todo list
router.route('/readnotebook')
.post(notes.readNotebook)

//create atodo list
router.route('/createnotebook')
.post(notes.checkNotebookName,notes.createNotebook)

//delete a todo list
router.route('/deletenotebook')
.post(notes.deleteNotebook)

//editname of todo list
router.route('/editnotebookname')
.post(notes.checkNotebookName,notes.editNotebookName)


//items route
router.route('/searchnotes')
.post(notes.searchNotes)

//create item
router.route('/createnote')
.post(notes.checkNoteName,notes.createNote)

//read note
router.route('/readnote')
.post(notes.readNote)

//edit a item
router.route('/editnote')
.post(nnotes.checkNoteName,notes.editNote)

//delete a item
router.route('/deletenote')
.post(notes.deleteNote)

//delete multiple items
router.route('/deletemultiplenotes')
.post(notes.deleteMultipleNotes)

//delete all items
router.route('/deleteallnotes')
.post(notes.deleteAllNotes)

module.exports = router
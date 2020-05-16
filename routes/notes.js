const express = require('express')
const notes  = require('./route_utils/notes_utils/index')
const router = express.Router()



//items route/
router.route('/searchnotebooks')
.post(notes.searchNotebooks)

//read all Notebooks /
router.route('/readallnotebooks')
.get(notes.readAllNotebooks)

//read a selected Notebook list/
router.route('/readnotebook')
.post(notes.readNotebook)

//create a  Notebook/
router.route('/createnotebook')
.post(notes.checkNotebookName,notes.createNotebook,notes.readAllNotebooks)

//delete a Notebook /
router.route('/deletenotebook')
.post(notes.deleteNotebook,notes.readAllNotebooks)

//editname of Notebook
router.route('/editnotebookname')
.post(notes.checkNotebookName,notes.editNotebookName,notes.readAllNotebooks)


//items route/
router.route('/searchnotes')
.post(notes.searchNotes)

//create note
router.route('/createnote')
.post(notes.checkNoteName,notes.createNote,notes.readNote)

//upload note
router.route('/uploadnote')
.post(notes.uploadNote,notes.readNote)

//read note
router.route('/readnote')
.post(notes.readNote)

//edit a item
router.route('/editnote')
.post(notes.checkNoteName,notes.editNote,notes.readNote)

//delete a item/
router.route('/deletenote')
.post(notes.deleteNote,notes.readNotebook)

//delete multiple items
router.route('/deletemultiplenotes')
.post(notes.deleteMultipleNotes,notes.readNotebook)

//delete all items/
router.route('/deleteallnotes')
.post(notes.deleteAllNotes,notes.readNotebook)

module.exports = router
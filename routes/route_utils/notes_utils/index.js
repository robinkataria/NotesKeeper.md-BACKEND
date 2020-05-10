const createNote = require('./createNote')
const createNotebook = require('./createNotebook')
const deleteAllNotes = require('./deleteAllNotes')
const deleteMultipleNotes=  require('./deleteMultipleNotes')
const deleteNote = require('./deleteNote')
const deleteNotebook = require('./deleteNotebook')
const editNote = require('./editNote')
const editNotebookName = require('./editNotebookName')
const readAllNotebooks = require('./readAllNotebooks')
const readNote = require('./readNote')
const readNotebook = require('./readNotebook')
const searchNotebooks = require('./searchNotebooks')
const searchNotes = require('./searchNotes')
const checkNoteName = require('./checkNoteName')
const checkNotebookName = require('./checkNotebookName')


module.exports = {
    createNote,
    createNotebook, 
    deleteAllNotes ,
    deleteMultipleNotes,
    deleteNote,
    deleteNotebook, 
    editNote,
    editNotebookName,
    readAllNotebooks,
    readNote,
    readNotebook, 
    searchNotebooks,
    searchNotes ,
    checkNoteName,
    checkNotebookName
}
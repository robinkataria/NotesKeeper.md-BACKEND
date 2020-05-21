const Note = require('../../../src/config/models/index').Note

const Busboy = require('busboy')
// File upload middleware; Parse incoming HTML form data

function streamToString(stream) {
    const chunks = []
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('error', reject)
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    })
}



function uploadNote(req, res, next) {
    const busboy = new Busboy({ headers: req.headers })
    let data = {}
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        data[fieldname] = val
    });
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        if (filename.split('.').pop() !== 'md') {
            res.json({ status: 401 })
        } else {
            const promise = streamToString(file)
            promise.then(result => {
                data['filecontent'] = result
            }).catch(err => res.json({ status: 500 }))
        }
    });

    busboy.on('finish', function () {
        Note.find({ user_id: req.user._id, name: data.name, notebook_id: data.notebook_id }, { name: 1 }, (err, note) => {
            if (err) { res.json({ statsu: 500 }) }
            else if (note.length > 0) { res.json({ status: 422 }) }
            else {
                Note.create({
                    user_id: req.user._id,
                    name: data.name,
                    notebook_id: data.notebook_id,
                    type: data.type,
                    data: data.filecontent || '',
                    commit_message: data.message || ''
                }, (err, note) => {
                    if (err) { res.json({ status: 500 }) }
                    else if (note) {
                        req.body.note_id = note._id
                        req.body.notebook_id = note.notebook_id
                        next()
                    } else {
                        res.json({ status: 401 })
                    }
                })
            }
        })

    });
    req.pipe(busboy);
}
module.exports = uploadNote
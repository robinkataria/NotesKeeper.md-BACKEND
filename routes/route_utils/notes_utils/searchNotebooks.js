const Notebook = require('../../../src/config/models/index').Notebook

function searchNotebook(req, res, next) {

    if (!req.body.query) { res.json({ status: 423 }) }   // Insufficient data

    else {
        const query = req.body.query;
        const regexQuery = new RegExp(query, 'i');
        // 'i' = case-insenstive
        // RegExp is seq of char that is used for text searching & replacing operation

        Notebook.find(
            {
                user_id: req.user._id,
                name: { $regex: regexQuery }
            },
            { user_id: 0 },
            (err, notebooks) => {
                if (err) { res.json({ status: 500 }) }
                else if (notebooks) { res.json({ status: 200, notebooks }) }
                else { res.json({ status: 401 }) }
            }
        )

    }
}

module.exports = searchNotebook
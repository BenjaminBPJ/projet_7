const connectionDb = require('../middleware/connect');
const fs = require('fs');

module.exports = (req, res, next) => {
    const id = req.params.id;
    connectionDb.query(`SELECT imageUrl FROM users WHERE id='${id}'`, (error, results, fields) => {
        if (error) {
            res.status(404).json({ message: `Aucune image trouvée.` });
        } else {
            fs.unlink(`avatars/${results[0].imageUrl}`, () => {
                next()
            })
        };
    });
};
const connectionDb = require('../middleware/connect');

module.exports = (req, res, next) => {
    const id = req.params.id;
    connectionDb.query(`SELECT userId FROM posts WHERE id='${id}'`, (error, results, fields) => {
        if (error) {
            res.status(404).json({ message: `Problème d'authentification.` });
        } else {
            if (results[0].userId === req.userIdAuth) {
                next();
            } else {
                res.status(404).json({ message: `Vous n'avez pas les droits pour supprimer cette publication` }); 
            };
        };
    });
};
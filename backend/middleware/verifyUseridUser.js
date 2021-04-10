const connectionDb = require('./connect');

module.exports = (req, res, next) => {
    const id = req.params.id;
    connectionDb.query(`SELECT id FROM users WHERE id='${id}'`, (error, results, fields) => {
        if (error) {
            res.status(404).json({ message: `Problème d'authentification.` });
        } else {
            if (results[0].id === req.userIdAuth) {
                next();
            } else {
                console.log(results)
                res.status(404).json({ message: `Vous n'avez pas les droits pour supprimer cette publication` }); 
            };
        };
    });
};
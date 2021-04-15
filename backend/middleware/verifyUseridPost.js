const connectionDb = require('./connect');

module.exports = (req, res, next) => {
    const id = req.params.id;
    connectionDb.query(`SELECT userId FROM posts WHERE id='${id}'`, (error, results, fields) => {
        console.log(results)
        if (error) {
            res.status(404).json({ message: `Problème d'authentification.` });            
        } else {
            if (results == "" ) {
                res.status(404).json({ message: `Pas de publication à cette adresse.` });
            };
            if (results[0].userId === req.userIdAuth) {
                next();
            } else {
                res.status(404).json({ message: `Vous n'avez pas les droits pour supprimer cette publication` }); 
            };
        };
    });
};
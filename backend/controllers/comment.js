const connectionDb = require('../middleware/connect');
const datePubli = require('../middleware/date');

exports.createComment = (req, res, next) => {
    const publiId = req.params.id;
    const content = req.body.comments;
    const publiAt = datePubli;
    
    const sql = `INSERT INTO commentaires (publiId, content, publiAt, userId) SELECT '${publiId}','${content}','${publiAt}', userId FROM posts WHERE id='${publiId}' `;
    connectionDb.query(sql, (error, result, fields) => {
        if (error) {
            return res.status(403).json({
                message: error
            });
        };
        return res.status(201).json({
            message: `Vous avez crée votre publication.`
        });
    });
};

exports.deleteComment = (req, res, next) => {
    const id = req.body.id;
    connectionDb.query(`DELETE FROM commentaires WHERE id='${id}'`, (error, results, fields) => {
        if (error) {
            return res.status(404).json({
                message: `Ce commentaire n'existe pas.`
            });
        };
        return res.status(204).json({
            message: `Vous avez supprimé votre commentaire.`
        });
    });
};

exports.getAllCommentsFromOnePubli = (req, res, next) => {
    const id = req.params.id;
    connectionDb.query(`SELECT * FROM commentaires WHERE publiId='${id}'`, (error, result, fields) => {
        if (error) {
            return res.status(400).json({ error: 'Publication non trouvée.' });
        };
        return res.status(200).json(result);
    });
};
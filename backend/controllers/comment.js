const connectionDb = require('../middleware/connect')
const datePubli = require('../middleware/date')
//const fs = require('fs');

exports.createComment = (req, res, next) => {
    const publiId = req.params.id;
    const content = req.body.comments;
    const publiAt = datePubli;
    const commentaire = `
    ('${publiId}',
    '${content}',
    '${publiAt}'
    )`;
    
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

exports.deletePost = (req, res, next) => {
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

exports.getAllPosts = (req, res, next) => {
    connectionDb.query(`SELECT * FROM posts`, (error, result, fields) => {
        if (error) {
            res.status(404).json({
                error: `Impossible de charger les publications.`
            });
        };
        res.status(200).json({result});
    });
};
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
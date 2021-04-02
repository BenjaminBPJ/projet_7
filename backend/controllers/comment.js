const connectionDb = require('../middleware/connect')
//const fs = require('fs');

exports.createComment = (req, res, next) => {
    const userId = req.params.userId;
    const content = req.body.comments;
    const publiAt = Date.now();
    const commentaire = `
    ('${userId}',
    '${content}',
    '${publiAt}'
    )`;

    const sql = `INSERT INTO commentaires (userId, content, publiAt) VALUES ${commentaire} `;
    connectionDb.query(sql, publi, (error, result, fields) => {
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
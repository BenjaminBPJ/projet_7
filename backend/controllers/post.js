const connectionDb = require('../middleware/connect');
const datePubli = require('../middleware/date');
const postUserId = require('../middleware/postUserId');
//const fs = require('fs');

exports.createPost = (req, res, next) => {
    const userId = req.params.userId;
    const datePublication = datePubli;
    const publication = req.body.publication;
    const imageUrl = req.body.imageUrl;
    const publi = `
    ('${userId}',
    '${datePublication}',
    '${publication}',
    '${imageUrl}'
    )`;

    const sql = `INSERT INTO posts (userId, datePublication, publication, imageUrl) VALUES ${publi} `;
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

exports.deletePost = (req, res, next) => {
    const id = req.params.id;
    connectionDb.query(`DELETE FROM posts WHERE id='${id}'`, (error, results, fields) => {
        if (error) {
            return res.status(404).json({
                message: `Cette publication n'existe pas.`
            });
        };
        return res.status(204).json({
            message: `Vous avez supprimé votre publication.`
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
        res.status(200).json({ result });
    });
};

exports.getPost = (req, res, next) => {
    const id = req.params.id;
    connectionDb.query(`SELECT * FROM posts WHERE id='${id}'`, (error, result, fields) => {
        if (error) {
            res.status(404).json({
                error: `Impossible de charger les publications.`
            });
        };
        res.status(200).json({ result });
    });
};



const connectionDb = require('../middleware/connect');
const datePubli = require('../middleware/date');
const postUserId = require('../middleware/postUserId');
//const fs = require('fs');

exports.createPost = (req, res, next) => {
    const userId = req.params.userId;
    const datePublication = datePubli;
    const titre = req.body.title;
    const publication = req.body.content;
    const file = req.files.contentImage;
    const imageUrl = Date.now() + file.name;
    const publi = `
    ('${userId}',
    '${datePublication}',
    '${titre}',
    '${publication}',
    '${imageUrl}'
    )`;

    if (!req.files) {
        return res.status(400).send('Aucun fichier téléchargé.');
    };

    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        file.mv('images/' + imageUrl, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                const sql = `INSERT INTO posts (userId, datePublication, titre, publication, imageUrl) VALUES ${publi} `;
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
        });
    };
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



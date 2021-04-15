const connectionDb = require('../middleware/connect');
const datePubli = require('../middleware/date');
const postModel = require('../models/postModel');

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
    postModel.delete(id)
        .then(result => {
            res.status(200).json({ message : result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};

exports.getAllPosts = (req, res, next) => {
    postModel.findAll()
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};

exports.getPost = (req, res, next) => {
    const id = req.params.id;
    postModel.find(id)
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(errorMessage => {
            res.status(404).json({ error: errorMessage });
        });
};



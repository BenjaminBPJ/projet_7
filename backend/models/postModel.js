const connectionDb = require('../middleware/connect');

exports.findAll = () => {
    const sql = `SELECT * FROM posts`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined) {
                reject(`Impossible de charger les publications.`);
            } else {
                resolve(result);
            };
        });
    });
};

exports.find = (id) => {
    const sql = `SELECT * FROM posts WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined) {
                reject(`Impossible de charger la publication.`);
            } else {
                resolve(result);
            };
        });
    });
};

exports.delete = (id) => {
    const sql = `DELETE FROM posts WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined) {
                reject(`Impossible de supprimer la publication.`);
            } else {
                resolve(`Vous avez supprimé votre publication`);
            };
        });
    });
};

exports.checkUserId = (id, userId) => {
    const sql = `SELECT userId FROM posts WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            console.log(result)
            if (result === undefined || result == "") {
                reject(`Impossible de trouver cette publication.`);
            }
            else if (result[0].userId === userId) {
                resolve(`Utilisateur authentifié.`);
            } else {
                reject(`Vous n'avez pas les droits pour modifier cette publication.`);
            };
        });
    });
};

exports.insert = (publi) => {
    console.log(publi)
    const sql = `INSERT INTO posts (userId, datePublication, titre, publication, imageUrl) VALUES ${publi} `;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, publi, (error, result, fields) => {
            console.log(result)
            if (result === undefined) {
                reject(`Impossible de créer la publication.`);
            } else {
                resolve(`Vous avez crée votre publication`);
            };
        });
    });
};

/*const userId = req.params.userId;
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
    };*/
const connectionDb = require('../middleware/connect');

exports.insert = (publi) => {
    const sql = `INSERT INTO posts (userId, datePublication, titre, publication, imageUrl) VALUES ${publi} `;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, publi, (error, result, fields) => {
            console.log(result)
            if (result === undefined) {
                console.log(error)
                reject(`Impossible de créer la publication.`);
            } else {
                resolve(`Vous avez crée votre publication`);
            };
        });
    });
};

exports.checkUserId = (id, userId) => {
    const sql = `SELECT userId FROM posts WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
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

exports.findPhoto = (id) => {
    const sql = `SELECT imageUrl FROM posts WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined) {
                reject(`Aucune image trouvée.`);
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

exports.findAll = () => {
    const sql = `SELECT * FROM posts`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined || result == "") {
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
            if (result === undefined || result == "") {
                reject(`Impossible de charger la publication.`);
            } else {
                resolve(result);
            };
        });
    });
};

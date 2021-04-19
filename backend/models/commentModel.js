const connectionDb = require('../middleware/connect');

exports.insert = (publiId, content, publiAt) => {
    const sql = `INSERT INTO commentaires (publiId, content, publiAt, userId) SELECT '${publiId}','${content}','${publiAt}', userId FROM posts WHERE id='${publiId}' `;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined) {
                reject(`Impossible de créer votre commentaire.`);
            } else {
                resolve(`Vous avez crée votre commentaire`);
            };
        });
    });
};

exports.find = (id) => {
    const sql = `SELECT * FROM commentaires WHERE publiId='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined || result == "") {
                reject(`Impossible de trouver votre commentaire.`);
            } else {
                resolve(result);
            };
        });
    });
};
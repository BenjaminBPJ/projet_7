const connectionDb = require('../middleware/connect');

exports.insert = (publiId, content, userId) => {
    const sql = `INSERT INTO commentaires (publiId, content, publiAt, userId, userFirstName, userLastName, userImage) SELECT '${publiId}', '${content}', NOW(), '${userId}', firstName, lastName, ImageUrl FROM users WHERE id='${userId}' `;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            console.log(error)
            if (result === undefined) {
                reject(`Impossible de créer votre commentaire.`);
            } else {
                resolve(`Vous avez crée votre commentaire.`);
            };
        });
    });
};

exports.delete = (id) => {
    const sql = `DELETE FROM commentaires WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined) {
                reject(`Impossible de trouver votre commentaire.`);
            } else {
                resolve(`Votre commentaire a été supprimé.`);
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

exports.modify = (content, id) => {
    const sql = `UPDATE commentaires SET content='${content}' WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined) {
                reject(`Impossible de trouver votre commentaire.`);
            } else {
                resolve('Vous avez modifié votre commentaire.');
            };
        });
    });
};

exports.checkUserId = (id, userId) => {
    const sql = `SELECT userId FROM commentaires WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined || result == "") {
                reject(`Impossible de trouver votre résultat.`);
            }
            else if (result[0].userId === userId) {
                resolve(`Utilisateur authentifié.`);
            } else {
                reject(`Vous n'avez pas les droits pour effectuer des modifications.`);
            };
        });
    });
};
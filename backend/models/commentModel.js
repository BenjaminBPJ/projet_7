const connectionDb = require('../middleware/connect');

exports.insert = (userId, publiId, content) => {
    const sql = `INSERT INTO commentaires (userId, publiId, content, publiAt) VALUES ('${userId}', '${publiId}', '${content}',NOW()) `;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            console.log(error)
            if (result === undefined) {
                reject(`Impossible de créer votre commentaire.`);
            } else if (content === ""){
                reject(`Vous devez écrire un commentaire.`);
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
    const sql = `SELECT commentaires.*, users.lastName, users.firstName, users.imageUrl AS usersimageUrl
    FROM commentaires 
    INNER JOIN users ON users.id=commentaires.userId
    WHERE publiId=${id}
    ORDER BY commentaires.publiAt DESC`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined || result == "") {
                reject(`Aucun commentaire.`);
            } else {
                resolve(result);
            };
        })
    });
};

exports.modify = (content, id) => {
    console.log(content)
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
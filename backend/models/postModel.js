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
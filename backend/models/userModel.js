const connectionDb = require('../middleware/connect');

exports.insert = (user) => {
    const sql = `INSERT INTO users (email, lastName, firstName, password) VALUES ${user} `;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, user, (error, result, fields) => {
            if (result === undefined) {
                reject(`Impossible de créer un nouvel utilisateur.`);
            } else {
                resolve(`Nouvel utilisateur enregistré`);
            };
        });
    });
};

exports.findByEmail = (email) => {
    const sql = `SELECT * FROM users WHERE email='${email}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined || result == "") {
                reject(`Utilisateur non trouvé.`);
            } else {
                resolve(result);
            };
        });
    });
};

exports.delete = (id) => {
    const sql = `DELETE FROM users WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined || result == "") {
                reject(`Utilisateur non trouvé.`);
            } else {
                resolve(`Vous avez supprimé votre profil.`);
            };
        });
    });
};

exports.checkUserId = (id, userId) => {
    const sql = `SELECT id FROM users WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined || result == "") {
                reject(`Impossible de trouver votre résultat.`);
            }
            else if (result[0].id === userId) {
                resolve(`Utilisateur authentifié.`);
            } else {
                reject(`Vous n'avez pas les droits pour effectuer des modifications.`);
            };
        });
    });
};

const updateUser = (sql, params) => {
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, params, (error, result, fields) => {
            if (result === undefined || result == "") {
                reject(`Impossible de modifier votre profil.`);
            } else {
                resolve(`Vous avez modifié votre profil.`);
            };
        });
    });
};

exports.update = (user) => {
    let sql = `UPDATE users SET description=?, imageUrl =? WHERE id=?`;
    let value = [user.description, user.imageUrl, user.userId]
    if (user.imageUrl === null){
        sql = `UPDATE users SET description=? WHERE id=?`;
        value = [user.description, user.userId]
    };
    return updateUser(sql, value);
};

exports.findPhoto = (id) => {
    const sql = `SELECT imageUrl FROM users WHERE id='${id}'`;
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

exports.findById = (id) => {
    const sql = `SELECT * FROM users WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined || result == "") {
                reject(`Utilisateur non trouvé.`);
            } else {
                resolve(result);
            };
        });
    });
};

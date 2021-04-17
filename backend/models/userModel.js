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

exports.updateDescription = (description, id) => {
    const sql = `UPDATE users SET description='${description}' WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined) {
                reject(`Utilisateur non trouvé.`);
            } else {
                resolve(`Vous avez modifié votre description.`);
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

exports.updatePhoto = (fileName, id) => {
    const sql = `UPDATE users SET imageUrl ='${fileName}' WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, (error, result, fields) => {
            if (result === undefined) {
                reject(`Impossible de modifier votre photo.`);
            } else {
                resolve(`Vous avez modifié votre photo.`);
            };
        });
    });
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

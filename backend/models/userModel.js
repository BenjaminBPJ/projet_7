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
            if (result === undefined) {
                reject(`Utilisateur non trouvé.`);
            } else {
                resolve(result);
            };
        });
    });
};


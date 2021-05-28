const connectionDb = require('../middleware/connect');

exports.insert = (publi) => {
    const sql = `INSERT INTO posts (userId, datePublication, titre, publication, imageUrl) VALUES (?, NOW(), ?, ?, ?) `;
    const value = [publi.userId, publi.titre, publi.publication, publi.imageUrl]
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, value, (error, result, fields) => {
            if (publi.imageUrl === null && publi.titre == "") {
                reject('Vous devez envoyer au moins un fichier ou un message de publication.');
            } else if (result === undefined) {
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
    const sql = `SELECT posts.*, users.lastName, users.firstName, users.imageUrl AS usersimageUrl
    FROM posts
    INNER JOIN users ON users.id=posts.userId
    ORDER BY posts.datePublication DESC`;
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

const updatePost = (sql, params) => {
    return new Promise((resolve, reject) => {
        connectionDb.query(sql, params, (error, result, fields) => {
            console.log(error)
            if (result === undefined || result == "") {
                reject(`Impossible de modifier la publication.`);
            } else {
                resolve('Vous avez modifié votre publication.');
            };
        });
    });
};

exports.update = (publi) => {
    console.log('update post')
    let sql = `UPDATE posts SET datePublication=NOW(), titre=?, publication=?, imageUrl=? WHERE id=?`;
    let value = [publi.titre, publi.publication, publi.imageUrl, publi.postId]
    if (publi.imageUrl === null){
        sql = `UPDATE posts SET datePublication=NOW(), titre=?, publication=? WHERE id=?`;
        value = [publi.titre, publi.publication, publi.postId];
    }
    return updatePost(sql, value);
};
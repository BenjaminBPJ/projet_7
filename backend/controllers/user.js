const connectionDb = require('../middleware/connect')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const email = req.body.email;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const pseudo = req.body.pseudo;
            const password = hash;
            const user = `
                    ('${email}',
                    '${firstName}',
                    '${lastName}',
                    '${pseudo}',
                    '${password}'
                    )`;

            const sql = `INSERT INTO users (email, lastName, firstName, pseudo, password) VALUES ${user} `;
            connectionDb.query(sql, user, (error, result, fields) => {
                if (error) {
                    return res.status(403).json({
                        message: error
                    })
                };

                const sql2 = `SELECT * FROM users WHERE email='${email}'`;

                connectionDb.query(sql2, email, (err, result) => {
                    if (error) {
                        return res.status(403).json({
                            message: error
                        });
                    };
                    res.status(200).json({
                        userPseudo: result[0].pseudo,
                        userId: result[0].id,
                        token: jwt.sign({
                            userId: result[0].id
                        }, 'RANDOM_TOKEN_SECRET', {
                            expiresIn: '24h'
                        })
                    });
                });
            });
        })
        .catch((error) => res.status(403).json({ error: `Impossible de créer un utilisateur` }))
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM users WHERE email='${email}'`;

    connectionDb.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        bcrypt
            .compare(password, result[0].password)
            .then((valid) => {
                if (!valid) {
                    return res.status(401).json({
                        error: 'Mot de passe incorrect.'
                    });
                }
                res.status(200).json({
                    userPseudo: result[0].pseudo,
                    userId: result[0].id,
                    token: jwt.sign({
                        userId: result[0].id
                    }, 'RANDOM_TOKEN_SECRET', {
                        expiresIn: '24h'
                    })
                })
            })
            .catch(error => res.status(401).json({
                error: 'Utilisateur non trouvé.'
            }))
    });
};

exports.deleteUser = (req, res, next) => {
    const user = req.params.pseudo;
    console.log(user)

    connectionDb.query(`DELETE FROM users WHERE pseudo='${user}'`, (error, results, fields) => {
        if (error) {
            return res.status(404).json({
                message: `Cet utilisateur n'existe pas.`
            });
        };
        return res.status(204).json({
            message: `Vous avez supprimé votre profil.`
        });
    });
};

exports.updateDescription = (req, res, next) => {
    const description = req.body.newDescription;
    const pseudo = req.params.pseudo;
    console.log(description)

    const sql = `UPDATE users SET description='${description}' WHERE pseudo='${pseudo}'`

    connectionDb.query(sql, (error, result) => {
        if (error) {
            return res.status(403).json({
                error: `Impossible de modifier votre description.`
            })
        };
        return res.status(201).json({
            message: `Votre description a été modifiée.`
        })
    });
};

/*exports.updatePhoto = (req, res, next) => {
    const pseudo = req.params.pseudo;
    const sql = `SELECT imageUrl from users WHERE pseudo='${pseudo}'`;

    connectionDb.query(sql, (error, result) => {
        const oldImage = result[0].imageUrl;
        if (oldImage) {
            if (error) {
                return res.status(403).json({
                    error: `Impossible de trouver cette photo.`
                });
            };
            console.log(oldImage);
            fs.unlink(`images/${oldImage}`, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    const url = req.file.filename;
                    console.log(url);
                    const sql = `UPDATE users SET imageUrl='${url}' WHERE pseudo='${pseudo}'`
                    connectionDb.query(sql, (error, result) => {
                        if (error) {
                            return res.status(403).json({
                                error: `Impossible de télécharger votre image.`
                            });
                        };
                        return res.status(201).json({
                            message: `Votre image a été modifiée, et l'ancienne supprimée.`
                        });
                    });
                };
            });
        };
    });
};*/

exports.getUser = (req, res, next) => {
    const pseudo = req.params.pseudo;
    connectionDb.query(`SELECT * FROM users WHERE pseudo='${pseudo}'`, (error, result, fields) => {
        if (error) {
            return res.status(400).json({ error: 'Utilisateur non trouvé.' });
        };
        return res.status(200).json(result)
    });
};
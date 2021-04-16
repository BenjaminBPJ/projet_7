const connectionDb = require('../middleware/connect')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordIsValide = require('../middleware/goodpassword')
const emailIsValide = require('../middleware/goodemail');
const fs = require('fs');
require('dotenv').config();
const userModel = require('../models/userModel');

exports.signup = (req, res, next) => {
    if (!emailIsValide.goodEmail(req.body.email) && !passwordIsValide.goodPassword(req.body.password)) {
        return res.status(401).json({ message: 'Votre adresse mail doit être correcte et votre mot de passe doit contenir au moins un chiffre, une minuscule, une majuscule et être composé de 8 caractères minimum !  ' });
    };
    if (!emailIsValide.goodEmail(req.body.email)) {
        return res.status(401).json({ message: 'Votre adresse mail doit être correcte ' });
    };
    if (!passwordIsValide.goodPassword(req.body.password)) {
        return res.status(401).json({ message: 'Votre mot de passe doit contenir au moins un chiffre, une minuscule, une majuscule et être composé de 8 caractères minimum !' });
    };
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const email = req.body.email;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const password = hash;
            const user = `
                    ('${email}',
                    '${firstName}',
                    '${lastName}',
                    '${password}'
                    )`;

            userModel.insert(user)
                .then(insertIntoUser => {
                    userModel.findByEmail(email)
                        .then(result => {
                            res.status(200).json({
                                userId: result[0].id,
                                token: jwt.sign({
                                    userId: result[0].id
                                }, process.env.JWT_TOKEN, {
                                    expiresIn: '24h'
                                })
                            })
                        })
                        .catch(errorMessage => {
                            res.status(404).json({ error: errorMessage });
                        })
                })
                .catch(errorMessage => {
                    res.status(404).json({ error: errorMessage });
                })
        })
        /*const sql = `INSERT INTO users (email, lastName, firstName, password) VALUES ${user} `;
        connectionDb.query(sql, user, (error, result, fields) => {
            if (error) {
                return res.status(403).json({
                    message: error
                });
            };
 
            const sql2 = `SELECT * FROM users WHERE email='${email}'`;
 
            connectionDb.query(sql2, email, (err, result) => {
                if (error) {
                    return res.status(403).json({
                        message: error
                    });
                };
                res.status(200).json({
                    userId: result[0].id,
                    token: jwt.sign({
                        userId: result[0].id
                    }, process.env.JWT_TOKEN, {
                        expiresIn: '24h'
                    })
                });
            });
        });
    })*/
        .catch((error) => res.status(403).json({ error: `Impossible de créer un utilisateur` }))
};


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM users WHERE email='${email}'`;

    connectionDb.query(sql, (err, result) => {
        if (err) throw err;
        bcrypt
            .compare(password, result[0].password)
            .then((valid) => {
                if (!valid) {
                    return res.status(401).json({
                        error: 'Mot de passe incorrect.'
                    });
                };
                res.status(200).json({
                    userId: result[0].id,
                    token: jwt.sign({
                        userId: result[0].id
                    }, process.env.JWT_TOKEN, {
                        expiresIn: '24h'
                    })
                });
            })
            .catch(error => res.status(404).json({
                error: 'Utilisateur non trouvé.'
            }));
    });
};

exports.deleteUser = (req, res, next) => {
    const user = req.params.id;

    connectionDb.query(`DELETE FROM users WHERE id='${user}'`, (error, results, fields) => {
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
    const description = req.body.description;
    const id = req.params.id;

    const sql = `UPDATE users SET description='${description}' WHERE id='${id}'`

    connectionDb.query(sql, (error, result) => {
        if (error) {
            return res.status(403).json({
                error: `Impossible de modifier votre description.`
            });
        };
        return res.status(201).json({
            message: `Votre description a été modifiée.`
        });
    });
};

exports.updatePhoto = (req, res, next) => {
    if (!req.files) {
        return res.status(400).send('Aucun fichier téléchargé.');
    };

    const file = req.files.uploadImage;  // uploadImage = clef = nom de l'input coté front
    const fileName = Date.now() + file.name;
    const id = req.params.id;

    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        file.mv('avatars/' + fileName, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                const sql = `UPDATE users SET imageUrl ='${fileName}' WHERE id='${id}'`;

                connectionDb.query(sql, (error, result) => {
                    if (error) {
                        return res.status(403).json({
                            error: `Impossible de télécharger votre image.`
                        });
                    };
                    return res.status(201).json({
                        message: `Votre image a été modifiée.`
                    });
                });
            };
        });
    } else {
        return res.status(403).json({
            error: `Format non autorisé, veuillez télécharger des fichiers aux formats '.png','.jpg'.`
        });
    };
};


exports.getUser = (req, res, next) => {
    const id = req.params.id;
    connectionDb.query(`SELECT * FROM users WHERE id='${id}'`, (error, result, fields) => {
        if (error) {
            return res.status(400).json({ error: 'Utilisateur non trouvé.' });
        };
        return res.status(200).json(result)
    });
};
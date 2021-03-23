const connectionDb = require('../middleware/connect')
const datePubli = require('../middleware/date')
//const fs = require('fs');

exports.createPost = (req, res, next) => {
    const userPseudo = req.params.pseudo;
    const datePublication = datePubli;
    const publication = req.body.publication;
    const imageUrl = req.body.imageUrl;
    const publi = `
    ('${userPseudo}',
    '${datePublication}',
    '${publication}',
    '${imageUrl}'
    )`;

    const sql = `INSERT INTO post (userPseudo, datePublication, publication, imageUrl) VALUES ${publi} `;
    connectionDb.query(sql, publi, (error, result, fields) => {
        if (error) {
            console.log(userPseudo)
            console.log(datePublication)
            console.log(imageUrl)
            console.log(publication)
            return res.status(403).json({
                message: error
            })
        };
        return res.status(201).json({
            message: `Vous avez crée votre publication.`
        })
    });
};

exports.deletePost = (req, res, next) => {
    connectionDb.query(`DELETE FROM post`, (error, results, fields) => {
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


exports.getAllPosts = (req, res, next) => {
    connectionDb.query(`SELECT * FROM post`, (error, result, fields) => {
        if (error) {
            console.log(result)
            res.status(404).json({
                error: `Impossible de charger les publications.`
            })
        }
        console.log(result)
        res.status(200).json({result})
    });
};
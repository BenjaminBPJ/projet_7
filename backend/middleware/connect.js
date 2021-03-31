const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0000',
    database : 'groupomania'
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connexion à MySql réussie');
})

module.exports = db ;
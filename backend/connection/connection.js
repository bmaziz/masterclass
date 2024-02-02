
const mysql = require('mysql2');

//database connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'masterclass',
        port: 3306,
        multipleStatements: true // Autorise l'exécution de plusieurs requêtes

    }
)
//check database Connection
db.connect(err => {
    if (err) { console.log(err, 'dberr'); }
    console.log('database connected');
})

module.exports =db;
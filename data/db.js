const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'blog_express',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connessione riuscita');
});

module.exports = connection;

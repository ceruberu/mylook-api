var mysql = require('mysql');

// local connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mylookdb'
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
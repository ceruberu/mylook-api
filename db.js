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

function Query(sql, insert) {
	return new Promise((resolve, reject) => {
			connection.query(sql, insert, (err, results) => {
				if (err) {
					return reject(err)
				}
				resolve(results)
			})
	})
}

module.exports = Query;
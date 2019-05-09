const mysql = require('mysql');

// local connection
// const connection = 
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'mylookdb'
// });

// production connection
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
})

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
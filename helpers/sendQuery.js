const mysqlConnection = require('../config/connection');

// Función para ejecutar consultas a la base de datos
const sendQuery = (query, callback) => {
	mysqlConnection.query(query, (err, result) => {
		if (err) {
			callback(err, null); // Si hay un error, pasamos el error al callback
		} else {
			callback(null, result); // Si no hay error, pasamos el resultado al callback
		}
	});
};

module.exports = sendQuery;

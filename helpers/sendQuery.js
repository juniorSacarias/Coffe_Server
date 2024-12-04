const mysqlConnection = require('../config/connection');

// Función para ejecutar consultas a la base de datos usando mysql2
const sendQuery = (query, values, callback) => {
	mysqlConnection.query(query, values, (err, result) => {
		if (err) {
			console.error('Error al ejecutar la consulta: ', err);
			callback(err, null); // Si hay un error, pasamos el error al callback
		} else {
			callback(null, result); // Si no hay error, pasamos el resultado al callback
		}
	});
};

module.exports = sendQuery;

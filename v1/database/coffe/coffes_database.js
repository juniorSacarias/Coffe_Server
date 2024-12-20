const sendQuery = require('../../../helpers/sendQuery');

// Función para obtener todos los cafés
const getAllCoffees = callback => {
	const query = 'SELECT * FROM coffes'; // Consulta SQL para obtener todos los cafés
	sendQuery(query, (err, result) => {
		if (err) {
			console.error('Error en la consulta de cafés:', err);
			callback(err, null); // Si hay error, lo pasamos al callback
		} else {
			callback(null, result); // Si no hay error, pasamos el resultado al callback
		}
	});
};

const getCoffeeById = (id, callback) => {
	const query = 'Select * from coffes where id = ?';
	sendQuery(query, [id], (err, result) => {
		if (err) {
			console.error('Error al obtener el café:', err);
			callback(err, null); // Si hay error, lo pasamos al callback
		} else {
			callback(null, result); // Si no hay error, pasamos el resultado al callback
		}
	});
};

module.exports = {
	getAllCoffees,
	getCoffeeById
};

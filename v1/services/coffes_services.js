// services/coffes_services.js
const Coffees_databases = require('../database/coffes_database');

const getAllCoffees = callback => {
	Coffees_databases.getAllCoffees((err, result) => {
		if (err) {
			console.error('Error en el servicio al obtener los cafés:', err);
			callback(err, null); // Si hay error, lo pasamos al callback
		} else {
			callback(null, result); // Si no hay error, pasamos el resultado al callback
		}
	});
};

module.exports = {
	getAllCoffees
};

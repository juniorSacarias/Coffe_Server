// controllers/coffes_controllers.js
const coffeesServices = require('../services/coffes_services');

const getAllCoffees = (req, res) => {
	// Llamamos a getAllCoffees y pasamos un callback adecuado
	coffeesServices.getAllCoffees((err, result) => {
		if (err) {
			console.error('Error al obtener los cafés:', err);
			res.status(500).send('Error al obtener los cafés');
		} else {
			res.status(200).json(result); // Retornamos los cafés al cliente
		}
	});
};

module.exports = {
	getAllCoffees
};

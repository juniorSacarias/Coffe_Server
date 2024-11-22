// controllers/coffes_controllers.js
const coffeesServices = require('../../services/coffe/coffes_services');

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

const getCoffeeById = (req, res) => {
	const { id } = req.params; // Obtenemos el id del café de los parámetros de la URL
	coffeesServices.getCoffeeById(id, (err, result) => {
		if (err) {
			console.error('Error al obtener el café:', err);
			res.status(500).send('Error al obtener el café');
		} else {
			res.status(200).json(result); // Retornamos el café al cliente
		}
	});
};

module.exports = {
	getAllCoffees,
	getCoffeeById
};

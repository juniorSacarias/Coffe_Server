const appClientServices = require('../../services/appClient/appClientServices');

const getAppClients = (req, res) => {
	appClientServices.getAppClients((err, result) => {
		if (err) {
			console.error('Error al obtener los clientes: ', err);
			res.status(500).send('Error al obtener los clientes');
		} else {
			res.status(200).json(result);
		}
	});
};

const getAppClientByName = (req, res) => {
	const { client } = req.params;

	if (!client) {
		res.status(400).send('Falta el nombre del cliente');
		return;
	}

	appClientServices.getAppClientByName(client, (err, result) => {
		if (err) {
			console.error('Error al obtener el cliente: ', err);
			res.status(500).send('Error al obtener el cliente');
		} else {
			res.status(200).json(result);
		}
	});
};

module.exports = {
	getAppClients,
	getAppClientByName,
};

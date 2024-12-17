const appClientDatabase = require('../../database/appClient/appClient_database');

const getAppClients = callback => {
	appClientDatabase.getAppClients((err, result) => {
		if (err) {
			console.error('Error al obtener los clientes: ', err);
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

const getAppClientByName = (client, callback) => {
	appClientDatabase.getAppClientByName(client, (err, result) => {
		if (err) {
			console.error('Error al obtener el cliente: ', err);
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

module.exports = {
	getAppClients,
	getAppClientByName,
};

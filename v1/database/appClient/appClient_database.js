const fs = require('fs');
const path = require('path');
const AppClient = require('../../models/appClient');

const getAppClients = async callback => {
	try {
		const appClients = await AppClient.findAll();
		callback(null, appClients);
	} catch (error) {
		console.error('Error al obtener los clientes: ', error);
	}
};

/*const getAppClientByName = async (client, callback) => {
	console.log(client);
	try {
		const appClient = await AppClient.findOne({
			where: {
				appTitle: client
			}
		});
		if (!appClient) {
			const error = new Error('Cliente no encontrado');
			console.error('Error al obtener el cliente: ', error);
			return callback(error, null);
		}
		console.log('Resultado de la API:', appClient);
		callback(null, appClient);
	} catch (error) {
		console.error('Error al obtener el cliente: ', error);
		callback(error, null);
	}
};*/

const getAppClientByName = (client, callback) => {
	try {
		const data = fs.readFileSync(path.join(__dirname, '../../../appClients.json'), 'utf8');
		const appClients = JSON.parse(data).appClients;
		const appClient = appClients.find(c => c.appTitle === client);
		if (!appClient) {
			const error = new Error('Cliente no encontrado');
			console.error('Error al obtener el cliente: ', error);
			return callback(error, null);
		}
		callback(null, appClient);
	} catch (error) {
		console.error('Error al obtener el cliente: ', error);
		callback(error, null);
	}
};

module.exports = {
	getAppClients,
	getAppClientByName
};

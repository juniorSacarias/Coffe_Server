const { Sequelize } = require('sequelize');
const { configDotenv } = require('dotenv');
configDotenv();

// Verificar variables de entorno
if (!process.env.host || !process.env.user || !process.env.password || !process.env.database) {
	throw new Error('Faltan variables de entorno requeridas para la conexión a la base de datos.');
}

// Crear instancia de Sequelize
const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
	host: process.env.host,
	dialect: 'mysql',
	port: 3306,
	logging: false // Puedes habilitar el registro de consultas SQL si lo deseas
});

// Probar la conexión
sequelize
	.authenticate()
	.then(() => {
		console.log('Conexión exitosa a la base de datos');
	})
	.catch(err => {
		console.error('Error al conectar a la base de datos:', err.message);
	});

module.exports = sequelize;

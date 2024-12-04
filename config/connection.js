/*const { configDotenv } = require('dotenv');
const mysql = require('mysql2');
configDotenv();

// Verificar variables de entorno
if (!process.env.host || !process.env.user || !process.env.password || !process.env.database) {
	throw new Error('Faltan variables de entorno requeridas para la conexión a la base de datos.');
}

// Crear conexión
let connection = mysql.createConnection({
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.database,
	port: 3306
});

// Conectar a la base de datos
connection.connect(err => {
	if (err) {
		console.error('Error al conectar a la base de datos:', err.message);
		return;
	}
	console.log('Conexión exitosa a la base de datos');
});

// Exportar conexión
module.exports = connection;*/

const sequelize = require('./sequelize');

module.exports = sequelize;

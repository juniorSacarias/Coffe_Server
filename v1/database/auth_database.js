const sendQuery = require('../../helpers/sendQuery');

const getUserByUserName = (userName, callback) => {
	const query = 'SELECT * FROM users WHERE userName = ?';
	sendQuery(query, [userName], (err, result) => {
		if (err) {
			console.error('Error en la consulta de usuario', err);
			callback(err, null);
		}
		if (result?.length === 0) {
			console.error('No se ha encontrado el usuario');
			callback(null, null); // Devuelve null si no se encuentra el usuario
		}
		callback(null, result[0]); // Si todo va bien, pasa el resultado
	});
};

const registerUser = (user, callback) => {
	const query = 'INSERT INTO users (userName, password) VALUES (?, ?)';
	sendQuery(query, [user.userName, user.password], (err, result) => {
		if (err) {
			console.error('Error al registrar el usuario:', err);
			callback(err, null); // Si hay un error, lo pasamos al callback
		}
		callback(null, result); // Devolvemos el resultado de la inserción si no hay error
	});
};

module.exports = {
	getUserByUserName,
	registerUser
};

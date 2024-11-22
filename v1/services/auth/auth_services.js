const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const authDatabases = require('../../database/auth/auth_database');

dotenv.config();

const authenticateUser = (userName, password, callback) => {
	// Llamada a la base de datos para obtener el usuario
	authDatabases.getUserByUserName(userName, (err, user) => {
		if (err) {
			return callback(err, null); // Si hay un error en la consulta, lo pasamos al callback
		}

		if (!user) {
			console.error('Usuario no encontrado');
			return callback(new Error('Usuario no encontrado'), null); // Usuario no encontrado
		}

		// Comparar la contraseña usando bcrypt
		bcrypt.compare(password, user.password, (err, passwordMatch) => {
			if (err) {
				console.error('Error al comparar la contraseña', err);
				return callback(err, null); // Si hay un error en la comparación, lo pasamos al callback
			}

			if (!passwordMatch) {
				console.error('Contraseña incorrecta');
				return callback(new Error('Contraseña incorrecta'), null); // Contraseña incorrecta
			}

			// Si la contraseña es correcta, generamos el token
			const token = jwt.sign(
				{
					userName: user.userName,
					userId: user.id
				},
				process.env.JWT_SECRET,
				{ expiresIn: '1h' }
			);

			callback(null, token); // Pasamos el token al callback
		});
	});
};

const registerUser = (userName, password, callback) => {
	// Encriptar la contraseña antes de guardarla en la base de datos
	bcrypt.hash(password, 10, (err, hashedPassword) => {
		if (err) {
			console.error('Error al encriptar la contraseña:', err);
			return callback(err, null); // Si hay un error en el hash, lo pasamos al callback
		}

		// Crear el objeto de usuario con la contraseña encriptada
		const user = { userName, password: hashedPassword };

		// Llamada al servicio de base de datos para registrar el usuario
		authDatabases.registerUser(user, (err, result) => {
			if (err) {
				console.error('Error al crear el usuario:', err);
				return callback(err, null); // Si hay un error al guardar el usuario en la base de datos, lo pasamos al callback
			}

			return callback(null, result); // Devolvemos el resultado de la creación del usuario
		});
	});
};

module.exports = {
	authenticateUser,
	registerUser
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const authDatabases = require('../../database/auth/auth_database');

dotenv.config();

const authenticateUser = (userName, password, callback) => {
	authDatabases.getUserByUserName(userName, (err, user) => {
		if (err) {
			return callback(err, null);
		}

		if (!user) {
			console.error('Usuario no encontrado');
			return callback(new Error('Usuario no encontrado'), null);
		}

		bcrypt.compare(password, user.password, (err, passwordMatch) => {
			if (err) {
				console.error('Error al comparar la contraseña', err);
				return callback(err, null);
			}

			if (!passwordMatch) {
				console.error('Contraseña incorrecta');
				return callback(new Error('Contraseña incorrecta'), null);
			}

			const token = jwt.sign(
				{
					userName: user.userName,
					userId: user.id
				},
				process.env.JWT_SECRET,
				{ expiresIn: '1h' }
			);

			callback(null, token);
		});
	});
};

const registerUser = (newUser, callback) => {
	authDatabases.getUserByUserName(newUser.username, (err, user) => {
		if (err) {
			return callback(err, null);
		}

		if (user) {
			return callback(new Error('El usuario ya está registrado'), null);
		}

		bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
			if (err) {
				console.error('Error al encriptar la contraseña:', err);
				return callback(err, null);
			}

			const userToCreate = {
				userName: newUser.username,
				password: hashedPassword,
				type: newUser.type,
				imageLink: newUser.imageLink || null
			};
			
			authDatabases.registerUser(userToCreate, (err, result) => {
				if (err) {
					console.error('Error al crear el usuario:', err);
					return callback(err, null);
				}

				return callback(null, result);
			});
		});
	});
};

module.exports = {
	authenticateUser,
	registerUser
};

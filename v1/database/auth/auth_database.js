const User = require('../../models/user');

const getUserByUserName = async (userName, callback) => {
	try {
		const user = await User.findOne({ where: { userName } });
		if (!user) {
			console.error('No se ha encontrado el usuario');
			return callback(null, null);
		}
		callback(null, user);
	} catch (err) {
		console.error('Error en la consulta de usuario', err);
		callback(err, null);
	}
};

const registerUser = async (userToCreate, callback) => {
	console.log(userToCreate);
	try {
		const newUser = await User.create({
			userName: userToCreate.userName,
			password: userToCreate.password,
			type: userToCreate.type,
			imageLink: userToCreate.imageLink || null
		});
		callback(null, newUser);
	} catch (err) {
		console.error('Error al registrar el usuario:', err);
		callback(err, null);
	}
};

module.exports = {
	getUserByUserName,
	registerUser
};

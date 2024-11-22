const authServices = require('../services/auth_services');

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.userName - The username of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {Object} res - The response object.
 * @returns {void}
 *
 * @description
 * This function handles the login of the user. It extracts the `userName` and `password` from the request body,
 * then calls the `authServices.authenticateUser` service to check the user. If an error occurs during registration,
 * it responds with a 401 status code and an error message. If the login is successful, it responds with a 200 status code,
 * a token and userName.
 */

const login = (req, res) => {
	const { userName, password } = req.body;

	// Llamamos a authenticateUser con callback
	authServices.authenticateUser(userName, password, (err, token) => {
		if (err) {
			return res.status(401).json({ message: err.message }); // Si hay un error, respondemos con 401
		}
		res.status(200).json({ token, userName }); // Si todo está bien, respondemos con el token
	});
};

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.userName - The username of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {Object} res - The response object.
 * @returns {void}
 *
 * @description
 * This function handles the registration of a new user. It extracts the `userName` and `password` from the request body,
 * then calls the `authServices.registerUser` service to register the user. If an error occurs during registration,
 * it responds with a 500 status code and an error message. If the registration is successful, it responds with a 201 status code,
 * a success message, and the ID of the newly created user.
 */

const registerUser = (req, res) => {
	const { userName, password } = req.body;

	// Llamamos al servicio para registrar el usuario
	authServices.registerUser(userName, password, (err, result) => {
		if (err) {
			return res.status(500).json({ error: err.message }); // Si hay un error al registrar, devolvemos un error
		}

		return res.status(201).json({ message: 'Usuario creado con éxito', userId: result.insertId });
	});
};

module.exports = {
	login,
	registerUser
};

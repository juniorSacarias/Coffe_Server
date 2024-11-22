const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
	// Extraemos el token del encabezado Authorization (con Bearer)
	const token = req.header('Authorization')?.replace('Bearer ', '');

	// Verificamos si el token está presente
	if (!token) {
		return res.status(403).json({
			message: 'Acceso denegado: no se proporcionó un token.'
		});
	}

	// Verificamos el token utilizando jwt.verify
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		// Si el token no es válido, enviamos un error
		if (err) {
			return res.status(403).json({
				message: 'Token inválido o expirado.'
			});
		}

		// Si el token es válido, almacenamos los datos decodificados en req.user
		req.user = decoded;
		next(); // Pasamos al siguiente middleware o a la ruta protegida
	});
};

module.exports = verifyToken;

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const verifyToken = require('./middelwares/authMiddelware');

// Inicializations
const app = express();

dotenv.config();

const Port = process.env.PORT || 4000;

const v1CoffeRouter = require('./v1/routes/coffe/coffes_routes');
const v1AuthRouter = require('./v1/routes/auth/auth_routes');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api/v1/auth', v1AuthRouter);
app.use('/api/v1/coffes', verifyToken, v1CoffeRouter);

// Exportar la aplicación para pruebas
module.exports = app;

// Iniciar el servidor solo si este archivo se ejecuta directamente
if (require.main === module) {
	app.listen(Port, () => {
		console.log(`Server running on port ${Port}`);
	});
}

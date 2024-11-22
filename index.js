const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// Inicializations

const app = express();

dotenv.config();

const Port = process.env.PORT || 4000;

const v1CoffeRouter = require('./v1/routes/coffes_routes');

// Middlewares

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

// Routes

app.use('/api/v1/coffes', v1CoffeRouter);

// Server

app.listen(Port, console.log(`Server running on port ${Port}`));

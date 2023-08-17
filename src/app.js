const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//console.log('app.js started')

//Manejo de errores
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));



//routes
const userRoutes = require('./routes/user.route');
const repairRoutes = require('./routes/repair.route');

//rutas
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairRoutes);

app.all('*', (req, res, next) => {
    return next(new AppError(`!Can´t find ${req.originalUrl} on This server!`, 404));
});

//Middleware para manejo centralizado de errores
app.use(globalErrorHandler)

module.exports = app;

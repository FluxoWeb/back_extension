const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
require('dotenv').config();
const bodyParser = require('body-parser');

// Archivos de las rutas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const promoRoutes = require('./routes/promoRoutes');
const carreraRoutes = require('./routes/carreraRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const materiaRoutes = require('./routes/materiaRoutes');
const projectoRoutes = require('./routes/projectoRoutes');

// File Middlewares
const { notFound, errorHandler } = require('./middlewares/errorHanddler');

// File DB Conection
const connectDB = require('./config/db');

// Configuracion del servidor para express
const app = express();
const port = process.env.PORT || 3000;

// Inicializacion de morgan
app.use(morgan('dev'));

// Conexión a la base de datos
connectDB();

// Middleware para procesar JSON en las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/curso', cursoRoutes);
app.use('/api/promo', promoRoutes);
app.use('/api/carrera', carreraRoutes);
app.use('/api/alumno', alumnoRoutes);
app.use('/api/docente', docenteRoutes);
app.use('/api/materia', materiaRoutes);
app.use('/api/projecto', projectoRoutes);

// Middleware server
app.use(notFound);
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

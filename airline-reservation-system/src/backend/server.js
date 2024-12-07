import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from './config/db.config'
const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require('cors');
const flightRoutes = require("./routes/flightRoutes");


const db = mysql
  .createPool({
    host: DB_HOST, // Cambiar por la dirección de tu servidor MySQL si no es local
    user: DB_USER, // Tu usuario de MySQL
    password: DB_PASSWORD, // Tu contraseña de MySQL
    database: DB_DATABASE, // Nombre de tu base de datos
  })
  .promise();
app.use(cors());
app.use(express.json()); // Asegúrate de que estás usando middleware para manejar JSON
app.use('/', flightRoutes); // O la ruta que estés usando

// Puerto y arranque del servidor
const PORT = 5009;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

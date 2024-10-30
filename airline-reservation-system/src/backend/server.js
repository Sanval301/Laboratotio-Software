const express = require("express");
const app = express();
const flightRoutes = require("./routes/flightRoutes");
const db = require("./config/db.config"); // Importar la conexión a la DB

// Middleware para parsear JSON
app.use(express.json());

// Rutas de vuelos
app.use("/airline-reservation-system/src/backend/routes", flightRoutes);

// Puerto y arranque del servidor
const PORT =  3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto ${3000}");
});

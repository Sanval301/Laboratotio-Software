const express = require("express");
const app = express();
const flightRoutes = require("./routes/flightRoutes");
const db = require("./config/db.config"); // Importar la conexión a la DB

// Middleware para parsear JSON
app.use(express.json());

// Rutas de vuelos
app.use("/api/vuelos", flightRoutes);

// Puerto y arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto ${3000}");
});

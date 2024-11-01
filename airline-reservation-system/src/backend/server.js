const express = require("express");
const app = express();
const cors = require('cors');
const flightRoutes = require("./routes/flightRoutes");
const db = require("./config/db.config"); // Importar la conexión a la DB

app.use(cors());
app.use(express.json()); // Asegúrate de que estás usando middleware para manejar JSON
app.use('/', flightRoutes); // O la ruta que estés usando

// Puerto y arranque del servidor
const PORT = 5004;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

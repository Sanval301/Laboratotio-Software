const mysql = require("mysql2");

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost", // Cambiar por la dirección de tu servidor MySQL si no es local
  user: "root", // Tu usuario de MySQL
  password: "password", // Tu contraseña de MySQL
  database: "airline_reservation", // Nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1);
  } else {
    console.log("Conectado a la base de datos MySQL.");
  }
});

module.exports = db;

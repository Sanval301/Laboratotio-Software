const mysql = require("mysql2");

// Configuración de la conexión a la base de datos
const db = mysql
  .createPool({
    host: "127.0.0.1", // Cambiar por la dirección de tu servidor MySQL si no es local
    user: "root", // Tu usuario de MySQL
    password: "1234", // Tu contraseña de MySQL
    database: "aeroticket", // Nombre de tu base de datos
  })
  .promise();

// Verificar conexión (opcional)
db.query("SELECT 1")
  .then(() => {
    console.log("Conectado a la base de datos MySQL.");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1);
  });

module.exports = db;

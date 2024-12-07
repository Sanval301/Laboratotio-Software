const mysql = require("mysql2");

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";


export const DB_HOST = process.env.DB_HOST || "localhost";

export const DB_PORT = process.env.DB_PORT || 5444;

export const DB_DATABASE = process.env.DB_DATABASE || "postgres";

export const DB_USER = process.env.DB_USER || "postgres";

export const DB_PASSWORD = process.env.DB_PASSWORD || "mysecretpassword"; I

export const PORT = process.env.PORT || 3000;

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

const db = require("../config/db");
const bcrypt = require("bcryptjs");

const registro = async (username, nombreCompleto, email, password, genero, cedula) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (username, nombreCompleto, email, password, genero, cedula) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [username, nombreCompleto, email, hashedPassword, genero, cedula];
      
      db.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: results.insertId, username, email });
        }
      });
    });
  } catch (error) {
    throw new Error("Error al registrar el usuario");
  }
};

module.exports = { registro };

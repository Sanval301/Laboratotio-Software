const db = require("../config/db.config");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (userDetails) => {
  return new Promise((resolve, reject) => {
    const { username, password, email } = userDetails;

    // Hashear la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return reject(err);

      const query = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
      db.query(query, [username, hashedPassword, email], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
};

// Inicio de sesión de usuario
const login = (username, password) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) return reject(err);

      if (results.length === 0) return reject("Usuario no encontrado");

      const user = results[0];

      // Verificar la contraseña
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return reject(err);

        if (!isMatch) return reject("Contraseña incorrecta");

        // Generar token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, "secreto", { expiresIn: '1h' });
        resolve({ token, user });
      });
    });
  });
};

// Obtener todos los vuelos desde la base de datos
const getAllFlights = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM flights", (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Crear un nuevo vuelo en la base de datos
const createFlight = (flightDetails) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO flights SET ?";
    db.query(query, flightDetails, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  register,
  login,
  getAllFlights,
  createFlight,
};

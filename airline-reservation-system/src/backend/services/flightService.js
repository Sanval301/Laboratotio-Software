const db = require("../config/db.config");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (userDetails) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users
      (NombreUsuario, NombreCompleto, CorreoElectronico, Contrasena, Genero, Cedula)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      userDetails.username,
      userDetails.fullName,
      userDetails.email,
      userDetails.password, // Recuerda encriptar la contraseña antes de guardarla
      userDetails.gender,
      userDetails.idCard
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
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
    const query = `
      INSERT INTO vuelos
      (CodigoVuelo, FechaVuelo, HoraSalida, Origen, Destino, DuracionVuelo, HoraLlegadaLocal, CostoPorPersona, EsInternacional, Estado, CreadoPor)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      flightDetails.CodigoVuelo,
      flightDetails.FechaVuelo,
      flightDetails.HoraSalida,
      flightDetails.Origen,
      flightDetails.Destino,
      flightDetails.DuracionVuelo,
      flightDetails.HoraLlegadaLocal,
      flightDetails.CostoPorPersona,
      flightDetails.EsInternacional,
      flightDetails.Estado,
      flightDetails.CreadoPor
    ];

    db.query(query, values, (err, result) => {
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

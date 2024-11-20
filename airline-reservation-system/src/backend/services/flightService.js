const db = require("../config/db.config");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds = 10; // Número de rondas de sal

const register = async (nombreusuario, nombreCompleto, email, contraseña, genero, cedula) => {
  try {
    // Cifrar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO usuarios (NombreUsuario, NombreCompleto, Email, Contraseña, Genero, Cedula) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [nombreusuario, nombreCompleto, email, hashedPassword, genero, cedula]; // Usa el hash en lugar de la contraseña

      console.log("Query:", query);
      console.log("Values:", values);

      db.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: results.insertId, nombreusuario, email });
        }
      });
    });
  } catch (error) {
    throw new Error("Error al registrar el usuario");
  }
};



// Inicio de sesión de usuario
const login = (email, contraseña) => {
  return new Promise((resolve, reject) => {
    console.log("Intentando iniciar sesión con email:", email); // Log del email que se está usando
    const query = "SELECT * FROM usuarios WHERE Email = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Error al ejecutar la consulta:", err); // Log del error de consulta
        return reject(err);
      }

      // Verifica si se encontraron resultados
      if (results.length === 0) {
        console.log("Usuario no encontrado con el email:", email); // Log de error
        return reject("Usuario no encontrado");
      }

      const user = results[0]; // Aquí ya puedes acceder a 'user'
      console.log("Usuario encontrado:", user); // Log del usuario encontrado

      // Verificar la contraseña
      bcrypt.compare(contraseña, user.Contraseña, (err, isMatch) => {
        if (err) {
            console.error("Error al comparar contraseñas:", err);
            return reject(err);
        }
    
        console.log("Contraseña ingresada:", contraseña);
        console.log("Contraseña almacenada:", user.Contraseña);
    
        if (!isMatch) {
            console.log("Contraseña incorrecta para el usuario:", user.NombreUsuario);
            return reject("Contraseña incorrecta");
        }
    
        // Generar token JWT
        const token = jwt.sign({ id: user.UsuarioID, nombreusuario: user.NombreUsuario }, "secreto", { expiresIn: '1h' });
        resolve({ token, user });
    });
    
    });
  });
};




// Obtener todos los vuelos desde la base de datos
const getAllFlights = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM vuelos", (err, results) => {
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
      (CodigoVuelo, FechaVuelo, HoraSalida, Origen, Destino, DuracionVuelo, HoraLlegadaLocal, CostoPorPersona, EsInternacional)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      flightDetails.EsInternacional
    
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};


const cancelFlight = (CodigoVuelo) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM vuelos WHERE CodigoVuelo = ?`;
    db.query(query, [CodigoVuelo], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.affectedRows === 0) {
        return reject("El vuelo no existe o ya ha sido cancelado.");
      }
      resolve({ message: "Vuelo cancelado exitosamente." });
    });
  });
};

const db = require("../config/db.config"); // Configuración de la base de datos

const createCard = async ({ cardNumber, cardHolder, expirationDate, cvv }) => {
  // Verificar si ya existe una tarjeta con el mismo número
  const [existingCard] = await db.promise().query(
    "SELECT * FROM cards WHERE cardNumber = ?",
    [cardNumber]
  );

  if (existingCard.length > 0) {
    throw new Error("Tarjeta ya existe");
  }

  // Insertar nueva tarjeta en la base de datos
  const [result] = await db.promise().query(
    "INSERT INTO cards (cardNumber, cardHolder, expirationDate, cvv) VALUES (?, ?, ?, ?)",
    [cardNumber, cardHolder, expirationDate, cvv]
  );

  // Retornar la tarjeta creada con su ID
  return {
    id: result.insertId,
    cardNumber,
    cardHolder,
    expirationDate,
    cvv,
  };
};

const deleteCard = async (cardId) => {
  // Eliminar tarjeta por ID
  const [result] = await db.promise().query("DELETE FROM cards WHERE id = ?", [cardId]);

  // Si no se eliminó ninguna tarjeta, retornar null
  return result.affectedRows > 0;
};


const BuyTicket = async (nombre, email, vuelo, fecha, tarjeta) => {
  try {
    const [resultado] = await db.query(
      'INSERT INTO compras (nombre, email, vuelo, fecha, tarjeta) VALUES (?, ?, ?, ?, ?)',
      [nombre, email, vuelo, fecha, tarjeta]
    );
    return resultado;
  } catch (error) {
    throw new Error('Error al realizar la compra');
  }
};



module.exports = {
  register,
  login,
  getAllFlights,
  createFlight,
  cancelFlight,
  createCard,
  deleteCard,
  BuyTicket
};

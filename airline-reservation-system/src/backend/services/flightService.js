const db = require("../config/db.config");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds = 10; // Número de rondas de sal

const register = async ({ 
  nombreusuario, 
  nombres,
  apellidos, 
  email, 
  contraseña, 
  genero, 
  cedula, 
  fechaNacimiento, 
  pais, 
  estado, 
  ciudad, 
  direccionFacturacion, 
  imagenUsuario
}) => {
  // Validar que la contraseña esté definida y no esté vacía
 

  // Cifrar la contraseña antes de almacenarla
  const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

  // Obtener la fecha actual para FechaRegistro
  const now = new Date();
  const fechaRegistro = now.toISOString().slice(0, 19).replace('T', ' ');

  // Verificar si el usuario ya existe
  const [existingUser] = await db.query(
    "SELECT * FROM Usuarios WHERE Email = ?",
    [email]
  );

  if (existingUser.length > 0) {
    throw new Error("El correo electrónico ya está registrado.");
  }

  // Insertar nuevo usuario en la base de datos
  const [result] = await db.query(
    `
      INSERT INTO Usuarios (
        Cedula, Nombres, Apellidos, FechaNacimiento, Pais, Estado, Ciudad,
        DireccionFacturacion, Email, NombreUsuario, Contraseña, Genero, ImagenUsuario, FechaRegistro
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      cedula, nombres, apellidos, fechaNacimiento, pais, estado, ciudad,
      direccionFacturacion, email, nombreusuario, hashedPassword, genero, imagenUsuario, fechaRegistro
    ]
  );

  // Retornar el usuario creado con su ID
  return {
    id: result.insertId,
    nombreusuario,
    email,
  };
};


// Inicio de sesión de usuario
const login = async (email, contraseña) => {
  // Obtener el usuario por email
  const [results] = await db.query("SELECT * FROM usuarios WHERE Email = ?", [email]);

  // Verificar si se encontró el usuario
  if (results.length === 0) {
    throw new Error("Usuario no encontrado");
  }

  const user = results[0];

  // Verificar la contraseña
  const isMatch = await bcrypt.compare(contraseña, user.Contraseña);
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  // Generar el token JWT
  const token = jwt.sign({ id: user.UsuarioID, nombreusuario: user.NombreUsuario }, "secreto", { expiresIn: '1h' });

  // Retornar el token y el usuario
  return { token, user };
};




// Obtener todos los vuelos desde la base de datos
const getAllFlights = async () => {
  try {
    const [results] = await db.query("SELECT * FROM vuelos"); // Sin callbacks, utilizando `await`
    return results;
  } catch (err) {
    throw err; // Propaga el error para que sea manejado por el controlador
  }
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



const createCard = async ({ numero, titular, fechaExpiracion, cvv }) => {
  // Verificar si ya existe una tarjeta con el mismo número
  const [existingCard] = await db.query(
    "SELECT * FROM tarjetas WHERE numero = ?",
    [numero]
  );

  if (existingCard.length > 0) {
    throw new Error("Tarjeta ya existe");
  }

  // Insertar nueva tarjeta en la base de datos
  const [result] = await db.query(
    "INSERT INTO tarjetas (numero, titular, fechaExpiracion, cvv) VALUES (?, ?, ?, ?)",
    [numero, titular, fechaExpiracion, cvv]
  );

  // Retornar la tarjeta creada con su ID
  return {
    id: result.insertId,
    numero,
    titular,
    fechaExpiracion,
    cvv,
  };
};

const deleteCard = async (numero) => {
  // Eliminar tarjeta por ID
  const [result] = await db.promise().query("DELETE FROM tarjetas WHERE numero = ?", [numero]);

  // Si no se eliminó ninguna tarjeta, retornar null
  return result.affectedRows > 0;
};


const BuyTicket = async (nombre, email, vuelo, fechaVuelo, estado,tarjeta,fechacompra) => {
  try {
    const [resultado] = await db.query(
      'INSERT INTO compras (nombre, email, vuelo, fechaVuelo, tarjeta, estado,fechacompra) VALUES (?, ?, ?, ?, ?,?,?)',
      [nombre, email, vuelo, fechaVuelo, tarjeta, estado,fechacompra]
    );
    return resultado;
  } catch (error) {
    throw new Error('Error al realizar la compra');
  }
};


const contarTiquetesPorPersona = async (email) => {
  const [rows] = await db.query('SELECT COUNT(*) AS total FROM compras WHERE email = ?', [email]);
  return rows[0].total;
};

const obtenerCompraPorId = async (id) => {
  const [rows] = await db.query('SELECT * FROM compras WHERE id = ?', [id]);
  return rows[0];
};

const cancelarCompra = async (id) => {
  const [result] = await db.query('UPDATE compras SET estado = ? WHERE id = ?', ['cancelada', id]);
  return result.affectedRows > 0;
};

// Crear una nueva reserva
const crearReserva = async (nombre, email, vuelo, fecha) => {
  const [result] = await db.query(
    'INSERT INTO reservas (nombre, email, vuelo, fechaVuelo, estado, expiracion) VALUES (?, ?, ?, ?, ?, NOW() + INTERVAL 24 HOUR)',
    [nombre, email, vuelo, fecha, 'reservada']
  );
  return result.insertId;
};

// Obtener reserva por ID
const obtenerReservaPorId = async (id) => {
  const [rows] = await db.query('SELECT * FROM reservas WHERE id = ?', [id]);
  return rows[0];
};

// Cancelar una reserva
const cancelarReserva = async (id) => {
  const [result] = await db.query('UPDATE reservas SET estado = ? WHERE id = ?', ['cancelada', id]);
  return result.affectedRows > 0;
};

// Liberar reservas expiradas (puede ser usado en un proceso programado)
const liberarReservasExpiradas = async () => {
  const [result] = await db.query('UPDATE reservas SET estado = ? WHERE expiracion <= NOW() AND estado = ?', ['liberada', 'reservada']);
  return result.affectedRows;
};

const createNews = async (titulo, informacion, precio_antes, precio_despues) => {
  try {
    const [resultado] = await db.query(
      'INSERT INTO noticias (titulo, informacion, precio_antes, precio_despues) VALUES (?, ?, ?, ?)',
      [titulo, informacion, precio_antes, precio_despues]
    );

    // Devolver la noticia creada con su ID
    return {
      id: resultado.insertId,
      titulo,
      informacion,
      precio_antes,
      precio_despues,
    };
  } catch (error) {
    console.error('Error al insertar la noticia:', error);
    throw new Error('Error al crear la noticia');
  }
};

const buscarVuelos = async (origen, destino, fechaVuelo, precioMin, precioMax) => {
  // Base query
  let query = 'SELECT * FROM Vuelos WHERE 1=1';
  const params = [];

  // Filtros dinámicos
  if (origen) {
    query += ' AND origen = ?';
    params.push(origen);
  }
  if (destino) {
    query += ' AND destino = ?';
    params.push(destino);
  }
  if (fechaVuelo) {
    query += ' AND DATE(fechaVuelo) = ?';
    params.push(fechaVuelo); // Aseguramos que solo compare la fecha, no la hora
  }
  if (precioMin) {
    query += ' AND precio >= ?';
    params.push(precioMin);
  }
  if (precioMax) {
    query += ' AND precio <= ?';
    params.push(precioMax);
  }

  // Ejecutar consulta
  const [rows] = await db.query(query, params);
  return rows;
};


const crearAdministrador = async (nombre, apellido, email, nombreUsuario, contraseñaTemporal, tipoAdmin) => {
  const contraseñaEncriptada = await bcrypt.hash(contraseñaTemporal, 10); // Encriptar contraseña temporal
  const [result] = await db.query(
    `
    INSERT INTO Administradores (Nombre, Apellido, Email, NombreUsuario, Contraseña, TipoAdmin)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [nombre, apellido, email, nombreUsuario, contraseñaEncriptada, tipoAdmin]
  );
  return result.insertId;
};

// Enviar correo con la contraseña temporal
const enviarCorreo = async (email, contraseñaTemporal) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tu-email@gmail.com', // Configurar tu correo
      pass: 'tu-contraseña' // Configurar tu contraseña
    }
  });

  const mailOptions = {
    from: 'tu-email@gmail.com',
    to: email,
    subject: 'Contraseña Temporal para Acceso de Administrador',
    text: `Hola, tu contraseña temporal para acceder al sistema es: ${contraseñaTemporal}\nPor favor, cámbiala al iniciar sesión.`
  };

  await transporter.sendMail(mailOptions);
};

// Actualizar contraseña (después de iniciar sesión)
const actualizarContraseña = async (adminId, nuevaContraseña) => {
  const contraseñaEncriptada = await bcrypt.hash(nuevaContraseña, 10); // Encriptar nueva contraseña
  await db.query(
    'UPDATE Administradores SET Contraseña = ? WHERE AdminID = ?',
    [contraseñaEncriptada, adminId]
  );
};

module.exports = {
  register,
  login,
  getAllFlights,
  createFlight,
  cancelFlight,
  createCard,
  deleteCard,
  BuyTicket,
  obtenerCompraPorId,//REvisarEssto
  cancelarCompra,
  contarTiquetesPorPersona,//revisar esto
  crearReserva,//faltan campos
  obtenerReservaPorId,//revisar esto
  cancelarReserva,//revisar
  liberarReservasExpiradas,//esta raro
  createNews,//revisar
  crearAdministrador,
  actualizarContraseña,
  enviarCorreo
};

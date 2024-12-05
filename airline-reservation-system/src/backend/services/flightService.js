// Importar dependencias necesarias
const db = require("../config/db.config");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Configuración general
const saltRounds = 10; // Número de rondas para encriptar contraseñas

/**
 * Registrar un nuevo usuario.
 * @param {...} Datos del usuario a registrar.
 * @returns {Object} Información del usuario creado.
 */
const JWT_SECRET = "secreto"; // ¡Reemplaza esto por una clave más segura!

const register = async (
  cedula,
  nombres,
  apellidos,
  fechaNacimiento,
  pais,
  estado,
  ciudad,
  direccionFacturacion,
  email,
  nombreUsuario,
  contraseña,
  genero,
  imagenUsuario
) => {
  console.log("Datos recibidos para registro:", { cedula, nombres, apellidos, email, nombreUsuario });

  if (!contraseña) {
    throw new Error("La contraseña es obligatoria.");
  }

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
    const fechaRegistro = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Verificar si el usuario ya existe
    const [existingUser] = await db.query("SELECT * FROM Usuarios WHERE Email = ?", [email]);
    if (existingUser.length > 0) {
      throw new Error("El correo electrónico ya está registrado.");
    }

    // Insertar el nuevo usuario en la base de datos
    const [result] = await db.query(
      `INSERT INTO Usuarios (Cedula, Nombres, Apellidos, FechaNacimiento, Pais, Estado, Ciudad, DireccionFacturacion, Email, NombreUsuario, Contraseña, Genero, ImagenUsuario, FechaRegistro) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [cedula, nombres, apellidos, fechaNacimiento, pais, estado, ciudad, direccionFacturacion, email, nombreUsuario, hashedPassword, genero, imagenUsuario, fechaRegistro]
    );

    // Generar el token JWT
    const token = jwt.sign(
      { id: result.insertId, nombreUsuario, email,contraseña }, // Datos que incluirás en el payload del token
      JWT_SECRET, // Clave secreta para firmar el token
      { expiresIn: "1h" } // El token expirará en 1 hora
    );

    // Retornar el token junto con otros datos opcionales
    return { token, nombreUsuario, email, id: result.insertId,contraseña };
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    throw new Error("Error al registrar el usuario: " + error.message);
  }
};

/**
 * Iniciar sesión de usuario.
 * @param {string} email - Correo del usuario.
 * @param {string} contraseña - Contraseña del usuario.
 * @returns {Object} Token JWT y usuario autenticado.
 */
const login = async (email, contraseña) => {
  try {
    const [results] = await db.query("SELECT * FROM usuarios WHERE Email = ?", [email]);
    if (results.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(contraseña, user.Contraseña);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign({ id: user.UsuarioID, nombreUsuario: user.NombreUsuario }, "secreto", { expiresIn: '1h' });
    return { token, user };
  } catch (error) {
    console.error("Error en inicio de sesión:", error.message);
    throw new Error(error.message);
  }
};

/**
 * Obtener todos los vuelos disponibles.
 * @returns {Array} Lista de vuelos.
 */
const getAllFlights = async () => {
  try {
    const [results] = await db.query("SELECT * FROM vuelos");
    return results;
  } catch (err) {
    console.error("Error al obtener vuelos:", err);
    throw new Error("Error al obtener la lista de vuelos.");
  } 
};

/**
 * Crear un nuevo vuelo.
 * @param {Object} flightDetails - Detalles del vuelo.
 * @returns {Object} Resultado de la operación.
 */
const createFlight = async (flightDetails) => {
  try {
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
      flightDetails.EsInternacional,
    ];

    const [result] = await db.query(query, values);
    return result;
  } catch (error) {
    console.error("Error al crear vuelo:", error.message);
    throw new Error("Error al crear el vuelo.");
  }
};

/**
 * Cancelar un vuelo.
 * @param {string} CodigoVuelo - Código del vuelo a cancelar.
 * @returns {Object} Resultado de la operación.
 */
const cancelFlight = async (CodigoVuelo) => {
  try {
    const [result] = await db.query("DELETE FROM vuelos WHERE CodigoVuelo = ?", [CodigoVuelo]);
    if (result.affectedRows === 0) {
      throw new Error("El vuelo no existe o ya ha sido cancelado.");
    }
    return { message: "Vuelo cancelado exitosamente." };
  } catch (error) {
    console.error("Error al cancelar vuelo:", error.message);
    throw new Error("Error al cancelar el vuelo.");
  }
};



/**
 * Crear una nueva tarjeta asociada a un usuario.
 * @param {Object} cardDetails - Detalles de la tarjeta.
 * @param {string} token - Token JWT del usuario.
 * @returns {Object} Tarjeta creada.
 */
const createCard = async ({ numero, titular, fechaExpiracion, cvv, saldo, nombreUsuario }) => {
  try {
    if (!nombreUsuario) {
      throw new Error("Usuario no encontrado.");
    }

    // Verificar si la tarjeta ya existe
    const [existingCard] = await db.query("SELECT * FROM tarjetas WHERE numero = ?", [numero]);
    if (existingCard.length > 0) {
      throw new Error("La tarjeta ya existe.");
    }

    // Insertar la tarjeta en la base de datos
    const [result] = await db.query(
      "INSERT INTO tarjetas (numero, titular, fechaExpiracion, cvv, nombreUsuario, saldo) VALUES (?, ?, ?, ?, ?, ?)",
      [numero, titular, fechaExpiracion, cvv, nombreUsuario, saldo]
    );

    return { id: result.insertId, numero, titular, fechaExpiracion, cvv, saldo };
  } catch (error) {
    console.error("Error al crear tarjeta:", error.message);
    throw new Error("Error al crear la tarjeta: " + error.message);
  }
};


const deleteCard = async (numero) => {
  // Eliminar tarjeta por ID
  const [result] = await db.query("DELETE FROM tarjetas WHERE numero = ?", [numero]);

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
const enviarCorreo = async (email, contraseña) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Cambia según tu proveedor
    auth: {
      user: "aeroticket906@gmail.com", // Cambia por tu correo real
      pass: "hsrqdhqffshayvxk", // Contraseña de aplicación para Gmail
    },
  });

  // Configuración del correo
  const mailOptions = {
    from: "aeroticket906@gmail.com",
    to: email,
    subject: "¡Bienvenido! Tu contraseña temporal",
    text: `Hola, tu contraseña temporal es: ${contraseña}.`, // Texto plano (opcional)
    html: `
      <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contraseña Temporal - AirTicket</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 5px;">
        <tr>
            <td style="padding: 30px;">
                <h1 style="color: #8A2BE2; margin-bottom: 20px;">¡Bienvenido a AirTicket!</h1>
                <p>Hola,</p>
                <p>Tu contraseña temporal para acceder al sistema es:</p>
                <p style="font-size: 24px; font-weight: bold; color: #000000; background-color: #E6E6FA; padding: 10px; border-radius: 5px; text-align: center;">
                    ${contraseña}
                </p>
                <p>Por favor, asegúrate de cambiar esta contraseña temporal la próxima vez que inicies sesión en tu cuenta.</p>
                <p>Si no has solicitado esta contraseña o tienes alguna pregunta, por favor contáctanos inmediatamente.</p>
                <br>
                <p>Saludos cordiales,</p>
                <p><strong>El equipo de AirTicket</strong></p>
            </td>
        </tr>
    </table>
    <p style="text-align: center; font-size: 12px; color: #6c757d; margin-top: 20px;">
        Este es un correo electrónico automático, por favor no responda a este mensaje.
    </p>
</body>
</html>
    `,
  };

  // Enviar el correo
  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};



// Actualizar contraseña (después de iniciar sesión)
const actualizarContraseña = async (adminId, nuevaContraseña) => {
  const contraseñaEncriptada = await bcrypt.hash(nuevaContraseña, 10); // Encriptar nueva contraseña
  await db.query(
    'UPDATE Administradores SET Contraseña = ? WHERE AdminID = ?',
    [contraseñaEncriptada, adminId]
  );
};

const obtenerTarjetasPorUsuario = async (nombreusuario) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tarjetas WHERE nombreusuario = ?",
      [nombreusuario]
    );
    return rows;
  } catch (error) {
    console.error("Error al consultar tarjetas:", error);
    throw new Error("Error al obtener las tarjetas");
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
  BuyTicket,
  obtenerCompraPorId,
  cancelarCompra,
  contarTiquetesPorPersona,
  crearReserva,//faltan campos
  obtenerReservaPorId,
  cancelarReserva,
  liberarReservasExpiradas,
  createNews,
  crearAdministrador,
  actualizarContraseña,
  enviarCorreo,
  obtenerTarjetasPorUsuario
};

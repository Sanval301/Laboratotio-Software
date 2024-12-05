const flightService = require("../services/flightService");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  const { email, contraseña } = req.body;

  // Validar datos obligatorios
  if (!email || !contraseña) {
    return res.status(400).json({ error: "El email y la contraseña son obligatorios" });
  }

  try {
    const { token, user } = await flightService.login(email, contraseña);
    res.status(200).json({ token, user }); // También devolver el usuario si es necesario
  } catch (error) {
    console.error("Error al iniciar sesión:", error); // Para registrar errores en el servidor
    if (error === "Usuario no encontrado") {
        res.status(404).json({ error: "Usuario no encontrado" });
    } else if (error === "Contraseña incorrecta") {
        res.status(401).json({ error: "Contraseña incorrecta" });
    } else {
        res.status(500).json({ error: "Error del servidor" });
    }
}

};



const register = async (req, res) => {
  console.log("Datos recibidos en req.body:", req.body)
  const {
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
  } = req.body;
  

  // Validar datos obligatorios
  const missingFields = [];

if (!nombreUsuario) missingFields.push("Nombre de Usuario");
if (!nombres) missingFields.push("Nombres");
if (!apellidos) missingFields.push("Apellidos");
if (!email) missingFields.push("Correo Electrónico");
if (!contraseña) missingFields.push("Contraseña");
if (!cedula) missingFields.push("Cédula");
if (!fechaNacimiento) missingFields.push("Fecha de Nacimiento");
if (!pais) missingFields.push("País");
if (!estado) missingFields.push("Estado");
if (!ciudad) missingFields.push("Ciudad");
if (!direccionFacturacion) missingFields.push("Dirección de Facturación");

if (missingFields.length > 0) {
  return res.status(400).json({
    message: `Los siguientes campos son obligatorios: ${missingFields.join(", ")}`
  });
}


  // Validar formato de email (opcional, pero recomendable)
  

  // Validar longitud de la contraseña (opcional)
  

  try {
    // Llamar a flightService.register con parámetros individuales
    const newUser = await flightService.register(
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
      imagenUsuario,
    );

    res.status(201).json({ message: "Usuario registrado exitosamente", userId: newUser.id });
  } catch (error) {
    console.error("Error al registrar usuario backend:", error);
    res.status(500).json({ message: "Error al registrar el usuario mamahuevo" });
  }
};




// Obtener todos los vuelos
const getAllFlights = async (req, res) => {
  try {
    const flights = await flightService.getAllFlights();
    if (!flights || flights.length === 0) {
      return res.status(404).json({ message: "No flights found" });  // Return a 404 if no flights are found
    }
    res.status(200).json(flights);  // Send the flights as a valid JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los vuelos' });
  }
};

// Crear una nueva reserva de vuelo
const createFlight = async (req, res) => {
  const {
    CodigoVuelo,
    FechaVuelo,
    HoraSalida,
    Origen,
    Destino,
    DuracionVuelo,
    CostoPorPersona,
    EsInternacional,
    HoraLlegadaLocal,
  } = req.body;

  // Validaciones de datos requeridos
  if (!CodigoVuelo || !FechaVuelo || !HoraSalida || !Origen || !Destino || !DuracionVuelo || !CostoPorPersona) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  // Validación de tipo numérico para CostoPorPersona
  if (isNaN(CostoPorPersona)) {
    return res.status(400).json({ message: "El costo por persona debe ser un número válido" });
  }

  try {
    const flightDetails = {
      CodigoVuelo,
      FechaVuelo,
      HoraSalida,
      Origen,
      Destino,
      DuracionVuelo,
      HoraLlegadaLocal,
      CostoPorPersona: parseFloat(CostoPorPersona),
      EsInternacional: EsInternacional ? 1 : 0,
    };

    // Inserta el vuelo en la base de datos
    const result = await flightService.createFlight(flightDetails);

    // Devuelve una respuesta exitosa
    res.status(201).json({
      message: "Vuelo creado exitosamente",
      flightId: result.insertId, // ID del vuelo insertado (si aplica)
    });
  } catch (error) {
    console.error("Error al crear el vuelo:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const cancelFlightController = async (req, res) => {
  try {
    const { CodigoVuelo } = req.params; // Suponiendo que el código de vuelo viene en los parámetros de la URL
    
    // Llama al servicio de cancelación de vuelo
    const result = await flightService.cancelFlight(CodigoVuelo);

    // Enviar respuesta exitosa
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    // Enviar respuesta de error
    res.status(400).json({
      success: false,
      message: error.message || "Error al cancelar el vuelo"
    });
  }
};


const createCard = async (req, res) => {
  const { numero, titular, fechaExpiracion, cvv, saldo,nombreUsuario } = req.body;

  // Validar datos obligatorios
  if (!numero || !titular || !fechaExpiracion || !cvv|| !saldo|| !nombreUsuario) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Validar número de tarjeta (16 dígitos)
  if (!/^[0-9]{16}$/.test(numero)) {
    return res.status(400).json({ error: "El número de tarjeta debe tener exactamente 16 dígitos" });
  }

  // Validar nombre del titular
  if (!/^[a-zA-Z\s]+$/.test(titular)) {
    return res.status(400).json({ error: "El nombre del titular solo debe contener letras y espacios" });
  }

  // Validar fecha de expiración (MM/YY)
  if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(fechaExpiracion)) {
    return res.status(400).json({ error: "La fecha de expiración debe estar en formato MM/YY" });
  }

  // Validar CVV (4 dígitos)
  if (!/^[0-9]{4}$/.test(cvv)) {
    return res.status(400).json({ error: "El CVV debe tener 3 o 4 dígitos" });
  }

  try {
    const card = flightService.createCard({ numero, titular, fechaExpiracion, cvv,saldo,nombreUsuario  });
    res.status(201).json({ message: "Tarjeta creada exitosamente", card });
  } catch (error) {
    console.error("Error al crear la tarjeta:", error);
    if (error.message === "Tarjeta ya existe") {
      res.status(409).json({ error: "La tarjeta ya está registrada" });
    } else {
      res.status(500).json({ error: "Error del servidor" });
    }
  }
};

const deleteCard = async (req, res) => {
  const { numero } = req.params;

  // Validar el ID
  if (!numero) {
    return res.status(400).json({ error: "El ID de la tarjeta es obligatorio" });
  }

  try {
    const result = await flightService.deleteCard(numero);
    if (!result) {
      return res.status(404).json({ error: "Tarjeta no encontrada" });
    }
    res.status(200).json({ message: "Tarjeta eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la tarjeta:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Compra de tiquetes
const BuyTicket = async (req, res) => {
  const { nombre, email, vuelo, fechaVuelo, estado,tarjeta,fechacompra } = req.body;

  // Validar datos obligatorios
  if (!nombre || !email || !vuelo || !fechaVuelo || !estado || !tarjeta || !fechacompra) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Validar nombre
  if (!/^[a-zA-Z\s]+$/.test(nombre)) {
    return res.status(400).json({ error: "El nombre debe contener solo letras y espacios" });
  }

  // Validar email
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ error: "El correo electrónico no es válido" });
  }

  // Validar vuelo
  if (!vuelo.trim()) {
    return res.status(400).json({ error: "El vuelo es obligatorio" });
  }

  // Validar fecha
  //if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaVuelo)) {
    //return res.status(400).json({ error: "La fecha no es válida, debe tener el formato YYYY-MM-DD" });
  //}

  // Validar tarjeta
  if (!/^\d{16}$/.test(tarjeta)) {
    return res.status(400).json({ error: "El número de tarjeta debe tener exactamente 16 dígitos" });
  }

  try {
    // Validar límite de compras
    const ticketsCount = await flightService.contarTiquetesPorPersona(email);

    if (ticketsCount >= 5) {
      return res.status(400).json({ error: "No puedes comprar más de 5 tiquetes por persona" });
    }

    // Realizar compra
    const resultado = await flightService.BuyTicket(nombre, email, vuelo, fechaVuelo, estado, tarjeta,fechacompra);
    res.status(200).json({ mensaje: "Compra realizada exitosamente", resultado });
  } catch (error) {
    console.error("Error al realizar la compra:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};


const cancelBuy = async (req, res) => {
  const { id } = req.params; // ID de la compra desde params
  const { email } = req.body; // Email desde el body

  // Validar ID y email
  if (!id) {
    return res.status(400).json({ error: "El ID de la compra es obligatorio" });
  }
  if (!email) {
    return res.status(400).json({ error: "El correo electrónico es obligatorio" });
  }

  try {
    const BuyTicket = await flightService.obtenerCompraPorId(id);

    // Validar si la compra existe
   // if (!compra) {
   //   return res.status(404).json({ error: "Compra no encontrada" });
   // }

    // Verificar que el email coincida
    if (BuyTicket.email !== email) {
      return res.status(403).json({ error: "El correo electrónico no coincide con la compra" });
    }

    // Verificar la restricción de tiempo (24 horas antes del vuelo)
    const fechaVuelo = new Date(BuyTicket.fecha);
    const fechaActual = new Date();
    const diferenciaHoras = (fechaVuelo - fechaActual) / (1000 * 60 * 60); // Diferencia en horas

    if (diferenciaHoras <= 24) {
      return res.status(400).json({ error: "La cancelación solo es posible más de 24 horas antes del vuelo" });
    }

    // Cancelar la compra
    const result = await flightService.cancelarCompra(id);

    res.status(200).json({ message: "Compra cancelada exitosamente", result });
  } catch (error) {
    console.error("Error al cancelar la compra:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

const reserveTicket = async (req, res) => {
  const { nombre, email, vuelo, fecha } = req.body;

  // Validar datos obligatorios
  if (!nombre || !email || !vuelo || !fecha) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Validar nombre
  if (!/^[a-zA-Z\s]+$/.test(nombre)) {
    return res.status(400).json({ error: "El nombre debe contener solo letras y espacios" });
  }

  // Validar email
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ error: "El correo electrónico no es válido" });
  }

  // Validar vuelo
  if (!vuelo.trim()) {
    return res.status(400).json({ error: "El vuelo es obligatorio" });
  }

  // Validar fecha
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return res.status(400).json({ error: "La fecha no es válida, debe tener el formato YYYY-MM-DD" });
  }

  try {
    // Validar límite de reservas y compras para el vuelo
    const totalTiquetes = await flightService.contarTiquetesPorPersona(email);

    if (totalTiquetes >= 5) {
      return res.status(400).json({ error: "Solo puedes reservar o comprar un máximo de 5 tiquetes por vuelo" });
    }

    // Crear reserva
    const resultado = await flightService.crearReserva(nombre, email, vuelo, fecha);
    res.status(200).json({ mensaje: "Reserva creada exitosamente", resultado });
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

const cancelReservation = async (req, res) => {
  const { id } = req.params;

  // Validar ID
  if (!id) {
    return res.status(400).json({ error: "El ID de la reserva es obligatorio" });
  }

  try {
    const reserva = await flightService.obtenerReservaPorId(id);

    // Validar si la reserva existe
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    // Cancelar la reserva
    const resultado = await flightService.cancelarReserva(id);

    res.status(200).json({ mensaje: "Reserva cancelada exitosamente", resultado });
  } catch (error) {
    console.error("Error al cancelar la reserva:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

const createNews = async (req, res) => {
  const { titulo, informacion, precio_antes, precio_despues } = req.body;

  // Validar campos obligatorios
  if (!titulo || !informacion || !precio_antes || !precio_despues) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Validar que los precios sean números válidos
  if (isNaN(precio_antes) || isNaN(precio_despues)) {
    return res.status(400).json({ error: 'Los precios deben ser números válidos' });
  }

  try {
    const noticia = await flightService.createNews({
      titulo,
      informacion,
      precio_antes,
      precio_despues,
    });

    res.status(201).json({ message: 'Noticia creada exitosamente', noticia });
  } catch (error) {
    console.error('Error al crear la noticia:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const searchFlights = async (req, res) => {
  const { origen, destino, fechaVuelo, precioMin, precioMax } = req.query;

  try {
    // Buscar vuelos con los filtros proporcionados
    const vuelos = await flightService.buscarVuelos(origen, destino, fechaVuelo, precioMin, precioMax);

    // Responder con los resultados
    res.status(200).json(vuelos);
  } catch (error) {
    console.error('Error al buscar vuelos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const createAdmin = async (req, res) => {
  const { nombre, apellido, email } = req.body;
  const tipoAdmin = 'admin'; // Por defecto, creamos un administrador normal
  const idCreador = req.userId; // Asumimos que el token tiene el ID del root

  try {
    // Generar una contraseña temporal
    const contraseñaTemporal = crypto.randomBytes(8).toString('hex'); // Contraseña aleatoria de 8 caracteres

    // Generar un nombre de usuario único basado en el correo
    const nombreUsuario = email.split('@')[0]; // Puedes personalizar esta lógica

    // Crear el administrador en la base de datos
    const adminId = await flightService.crearAdministrador(nombre, apellido, email, nombreUsuario, contraseñaTemporal, tipoAdmin);

    // Enviar correo con la contraseña temporal
    await flightService.enviarCorreo(email, contraseñaTemporal);

    res.status(201).json({ mensaje: 'Administrador creado exitosamente', adminId });
  } catch (error) {
    console.error('Error al crear administrador:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const changePassword = async (req, res) => {
  const { adminId, nuevaContraseña } = req.body;

  if (!nuevaContraseña) {
    return res.status(400).json({ error: 'La nueva contraseña es obligatoria' });
  }

  try {
    // Actualizar contraseña en la base de datos
    await flightService.actualizarContraseña(adminId, nuevaContraseña);

    res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const enviarCorreo = async (req, res) => {
  const { email, contraseña } = req.body; // Datos enviados desde el frontend

  // Mostrar en consola los datos recibidos
  console.log("Datos recibidos en enviarCorreo:");
  console.log("Email:", email);
  console.log("Contraseña:", contraseña);

  // Validar los datos recibidos
  if (!email || !contraseña) {
    return res.status(400).json({ error: "Email y contraseña temporal son requeridos" });
  }

  try {
    // Llamar a la función para enviar el correo
    await flightService.enviarCorreo(email, contraseña);
    res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ error: "Hubo un error al enviar el correo" });
  }
};


const obtenerTarjetas = async (req, res) => {
  try {
    // Obtener el token desde los headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No se proporcionó un token" });
    }

    // Verificar el token y extraer el payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const nombreusuario = decoded.nombreusuario;

    if (!nombreusuario) {
      return res.status(400).json({ error: "Token inválido: no contiene nombreusuario" });
    }

    // Llamar al servicio para obtener las tarjetas
    const tarjetas = await flightService.obtenerTarjetasPorUsuario(nombreusuario);

    if (tarjetas.length === 0) {
      return res.status(404).json({ message: "No se encontraron tarjetas asociadas al usuario" });
    }

    // Responder con las tarjetas encontradas
    res.status(200).json({ tarjetas });
  } catch (error) {
    console.error("Error en el controlador de tarjetas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  login,
  register,
  getAllFlights,
  createFlight,
  cancelFlightController,
  createCard,
  deleteCard,
  BuyTicket,
  cancelBuy,
  reserveTicket,
  cancelReservation,
  createNews,
  searchFlights,
  createAdmin,
  changePassword,
  enviarCorreo,
  obtenerTarjetas

};

const flightService = require("../services/flightService");


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
  const { nombreusuario, nombreCompleto, email, contraseña, genero, cedula } = req.body;

  // Validar datos obligatorios
  if (!nombreusuario || !nombreCompleto || !email || !contraseña || !cedula) {
    return res.status(400).json({ message: "Todos los campos marcados con * son obligatorios" });
  }

  // Validar formato de email (opcional, pero recomendable)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "El formato del email es inválido" });
  }

  // Validar longitud de la contraseña (opcional)
  if (contraseña.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }

  try {
    // Llamar a flightService.register con parámetros individuales
    const newUser = await flightService.register(
      nombreusuario,
      nombreCompleto,
      email,
      contraseña,
      genero,
      cedula
    );

    res.status(201).json({ message: "Usuario registrado exitosamente", userId: newUser.id });
  } catch (error) {
    console.error("Error al registrar usuario backend:", error);
    res.status(500).json({ message: "Error al registrar el usuario backend" });
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


module.exports = {
  login,
  register,
  getAllFlights,
  createFlight,
  cancelFlightController,
};

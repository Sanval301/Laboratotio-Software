const flightService = require("../services/flightService");
const db = require("../config/db.config");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await flightService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: "Credenciales inválidas" });
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
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los vuelos" });
  }
};

// Crear una nueva reserva de vuelo
const createFlight = async (req, res) => {
  const { flightCode, date, time, origin, destination, duration, isInternational, localTimeAdjustment, estimatedArrival, costPerPerson } = req.body;

  // Verificar que todos los datos requeridos estén presentes
  if (!flightCode || !date || !time || !origin || !destination || !duration || !costPerPerson) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  // Validación adicional (ejemplo)
  if (isNaN(costPerPerson)) {
    return res.status(400).json({ message: "El costo por persona debe ser un número válido" });
  }
}


module.exports = {
  login,
  register,
  getAllFlights,
  createFlight,
};

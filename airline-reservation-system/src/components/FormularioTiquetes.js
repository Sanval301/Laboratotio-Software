import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Snackbar, Alert, Box } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Importación correcta

const FormularioTiquetes = ({ vuelo }) => {
  const [datosViajeros, setDatosViajeros] = useState([]);
  const [nuevoViajero, setNuevoViajero] = useState({
    documento: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    genero: "",
    telefono: "",
    correo: "",
    contacto: "",
    telefonoContacto: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [severity, setSeverity] = useState("success");

  // Estado para los datos del usuario
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token almacenado
        if (!token) throw new Error("Token no encontrado");

        const decoded = jwtDecode(token); // Decodificar el token
        console.log("Datos decodificados del token:", decoded);

        // Si el token contiene suficiente información, usa los datos locales
        setNuevoViajero({
          ...nuevoViajero,
          documento: decoded.cedula || "",
          nombres: decoded.nombres || "",
          apellidos: decoded.apellidos || "",
          correo: decoded.email || "",
          fechaNacimiento: decoded.fechaNacimiento || "",
          genero: decoded.genero || "",
        });

        // Si necesitas más datos, realiza una solicitud al backend
        const response = await axios.get("http://localhost:5009/getUserProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Aquí puedes usar los datos obtenidos del backend si es necesario
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const agregarViajero = () => {
    if (datosViajeros.length >= 5) {
      mostrarMensaje("Solo puedes agregar un máximo de 5 viajeros.", "error");
      return;
    }
    const edad =
      new Date().getFullYear() -
      new Date(nuevoViajero.fechaNacimiento).getFullYear();
    if (edad < 18 && datosViajeros.length === 0) {
      mostrarMensaje("Un menor de edad no puede viajar solo.", "error");
      return;
    }
    setDatosViajeros([...datosViajeros, nuevoViajero]);
    setNuevoViajero({
      documento: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      genero: "",
      telefono: "",
      correo: "",
      contacto: "",
      telefonoContacto: "",
    });
    mostrarMensaje("Viajero agregado exitosamente.", "success");
  };

  const formatearFecha = (fecha) => {
    const f = new Date(fecha);
    const year = f.getFullYear();
    const month = String(f.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    const day = String(f.getDate()).padStart(2, '0');
    const hours = String(f.getHours()).padStart(2, '0');
    const minutes = String(f.getMinutes()).padStart(2, '0');
    const seconds = String(f.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  
  const enviarFormulario = async (tipoAccion) => {
    if (datosViajeros.length === 0) {
      mostrarMensaje("Debes agregar al menos un viajero.", "error");
      return;
    }
  
    if (!vuelo) {
      mostrarMensaje("Debe haber un vuelo seleccionado.", "error");
      return;
    }
  
    const calcularExpiracion = () => {
      const ahora = new Date(); // Obtener la fecha y hora actual
      ahora.setHours(ahora.getHours() + 23); // Agregar 23 horas
      return formatearFecha(ahora); // Devolver en formato 'YYYY-MM-DD HH:MM:SS'
    };
  
    try {
      const payload = {
        nombre: datosViajeros[0].nombres, // Usamos el nombre del primer viajero
        email: datosViajeros[0].correo,   // Usamos el correo del primer viajero
        vuelo: vuelo.VueloID,              // El vuelo seleccionado
        fechaVuelo: formatearFecha(vuelo.FechaVuelo),  // Fecha formateada del vuelo
        expiracion: calcularExpiracion(), // Calculamos la expiración y la formateamos
      };
  
      console.log(payload); // Verifica que los datos estén correctos antes de enviarlos
  
      // Seleccionar la ruta según el tipo de acción
      const url =
        tipoAccion === "compra"
          ? "http://localhost:5009/comprartiquete" // Ruta para comprar
          : "http://localhost:5009/reservartiquete"; // Ruta para reservar
  
      const response = await axios.post(url, payload);
  
      if (response.status === 200) {
        const mensaje =
          tipoAccion === "compra"
            ? "Compra realizada exitosamente."
            : "Reserva realizada exitosamente.";
        mostrarMensaje(mensaje, "success");
        setDatosViajeros([]); // Limpiar los datos de los viajeros después de la reserva/compra
      } else {
        mostrarMensaje("Ocurrió un error al procesar la solicitud.", "error");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      mostrarMensaje("Ocurrió un error al procesar la solicitud.", "error");
    }
  };
  
  
  
  const mostrarMensaje = (mensaje, severidad) => {
    setMensaje(mensaje);
    setSeverity(severidad);
    setOpenSnackbar(true);
  };

  return (
    <Grid container spacing={2}>
      {vuelo && (
        <Grid item xs={12}>
          <h3>Detalles del Vuelo Seleccionado</h3>
          <p>Origen: {vuelo.Origen}</p>
          <p>Destino: {vuelo.Destino}</p>
          <p>Fecha: {vuelo.FechaVuelo}</p>
          <p>Precio: ${vuelo.CostoPorPersona}</p>
        </Grid>
      )}

      {/* Mostrar los campos del viajero con datos predeterminados si ya están disponibles */}
      {Object.keys(nuevoViajero).map((campo) => (
        <Grid item xs={12} sm={6} key={campo}>
          <TextField
            fullWidth
            label={campo.replace(/([A-Z])/g, " $1")}
            value={nuevoViajero[campo]}
            onChange={(e) =>
              setNuevoViajero({ ...nuevoViajero, [campo]: e.target.value })
            }
          />
        </Grid>
      ))}

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={agregarViajero}>
          Agregar Viajero
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => enviarFormulario("reserva")}
            sx={{ mr: 2 }}
          >
            Reservar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => enviarFormulario("compra")}
          >
            Comprar
          </Button>
        </Box>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={severity}>
          {mensaje}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default FormularioTiquetes;

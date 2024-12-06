import React, { useState } from "react";
import { TextField, Button, Grid, Snackbar, Alert, Box } from "@mui/material";
import axios from "axios";

const FormularioTiquetes = ({ tipo }) => {
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

  const enviarFormulario = async (tipoAccion) => {
    if (datosViajeros.length === 0) {
      mostrarMensaje("Debes agregar al menos un viajero.", "error");
      return;
    }

    try {
      const payload = {
        tipo: tipoAccion, // "reserva" o "compra"
        viajeros: datosViajeros,
      };
      console.log("fronted:",payload)
      // Llamada al backend
      const response = await axios.post(
        "http://localhost:5009/gestionTiquetes",
        payload
      );

      if (response.status === 200) {
        mostrarMensaje(
          `Formulario enviado como ${tipoAccion} exitosamente.`,
          "success"
        );
        setDatosViajeros([]); // Limpiar el estado de los viajeros
      } else {
        mostrarMensaje("Ocurrió un error al enviar el formulario.", "error");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
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
      <Grid item xs={12}>
        <h2>Formulario de Compra/Reserva</h2>
      </Grid>
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

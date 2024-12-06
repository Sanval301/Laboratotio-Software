import React, { useState } from "react";
import { TextField, Button, Grid, Snackbar, Alert, Box } from "@mui/material";

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

  const enviarFormulario = (tipo) => {
    // Aquí puedes agregar la lógica para enviar el formulario a la base de datos
    console.log("Enviando formulario con tipo:", tipo);
    mostrarMensaje(`Formulario enviado como ${tipo}`, "success");
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

import React, { useState } from "react";
import { TextField, Button, Grid, Snackbar, Alert } from "@mui/material";

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
    // Validación: no menores de edad sin acompañantes
    const edad =
      new Date().getFullYear() -
      new Date(nuevoViajero.fechaNacimiento).getFullYear();
    if (edad < 18 && datosViajeros.length === 0) {
      mostrarMensaje("Un menor de edad no puede viajar solo.", "error");
      return;
    }

    if (datosViajeros.length >= 5) {
      mostrarMensaje(
        "No se pueden agregar más de 5 viajeros por vuelo.",
        "error"
      );
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
    mostrarMensaje("Viajero agregado con éxito.", "success");
  };

  const mostrarMensaje = (mensaje, severidad) => {
    setMensaje(mensaje);
    setSeverity(severidad);
    setOpenSnackbar(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>
          {tipo === "reserva"
            ? "Formulario de Reserva"
            : "Formulario de Compra"}
        </h2>
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
        <Button variant="outlined" color="secondary">
          {tipo === "reserva" ? "Reservar" : "Comprar"}
        </Button>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {mensaje}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default FormularioTiquetes;

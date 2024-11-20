import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

const CarritoCompras = () => {
  const [carrito, setCarrito] = useState([
    // Ejemplo de tiquetes en el carrito
    { vuelo: "VU123", clase: "Económica", precio: 200, viajeros: 2 },
  ]);
  const [tarjeta, setTarjeta] = useState({ numero: "", saldo: 0 });
  const [mensaje, setMensaje] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const realizarPago = () => {
    const total = carrito.reduce(
      (sum, item) => sum + item.precio * item.viajeros,
      0
    );

    if (tarjeta.saldo >= total) {
      setTarjeta({ ...tarjeta, saldo: tarjeta.saldo - total });
      setCarrito([]);
      mostrarMensaje("Pago realizado con éxito.", "success");
    } else {
      mostrarMensaje("Saldo insuficiente.", "error");
    }
  };

  const mostrarMensaje = (mensaje, severidad) => {
    setMensaje(mensaje);
    setSeverity(severidad);
    setOpenSnackbar(true);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Carrito de Compras
      </Typography>
      <Grid container spacing={2}>
        {carrito.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">Vuelo: {item.vuelo}</Typography>
                <Typography>Clase: {item.clase}</Typography>
                <Typography>Precio: ${item.precio}</Typography>
                <Typography>Viajeros: {item.viajeros}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h6">
            Total: $
            {carrito.reduce(
              (sum, item) => sum + item.precio * item.viajeros,
              0
            )}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Número de Tarjeta"
            value={tarjeta.numero}
            onChange={(e) => setTarjeta({ ...tarjeta, numero: e.target.value })}
          />
          <TextField
            fullWidth
            label="Saldo Disponible"
            type="number"
            value={tarjeta.saldo}
            onChange={(e) =>
              setTarjeta({ ...tarjeta, saldo: parseFloat(e.target.value) })
            }
            sx={{ mt: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={realizarPago}>
            Pagar
          </Button>
        </Grid>
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
    </div>
  );
};

export default CarritoCompras;

import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import NavbarCliente from "./NavbarCliente";
import Footer from "./Footer";
import MenuLateral from "./MenuLateral";

function Historial() {
  const [historial, setHistorial] = useState([
    {
      id: 1,
      vuelo: "VU123",
      tipo: "Compra",
      estado: "Confirmado",
      fecha: "2024-11-01",
    },
    {
      id: 2,
      vuelo: "VU456",
      tipo: "Reserva",
      estado: "Pendiente",
      fecha: "2024-11-02",
    },
  ]);
  const [mensaje, setMensaje] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const cancelar = (id) => {
    const item = historial.find((item) => item.id === id);

    if (item.tipo === "Compra") {
      const horasRestantes = Math.abs(new Date(item.fecha) - new Date()) / 36e5;
      if (horasRestantes < 1) {
        mostrarMensaje(
          "No se puede cancelar compras a menos de 1 hora del vuelo.",
          "error"
        );
        return;
      }
    } else if (item.tipo === "Reserva") {
      const horasReservadas =
        Math.abs(new Date() - new Date(item.fecha)) / 36e5;
      if (horasReservadas > 24) {
        mostrarMensaje("La reserva ya expiró y no se puede cancelar.", "error");
        return;
      }
    }

    setHistorial(historial.filter((item) => item.id !== id));
    mostrarMensaje("Cancelación exitosa.", "success");
  };

  const mostrarMensaje = (mensaje, severidad) => {
    setMensaje(mensaje);
    setSeverity(severidad);
    setOpenSnackbar(true);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <NavbarCliente />
      <Box display="flex" flex={1} overflow="auto">
        {/* Menú lateral */}
        <MenuLateral />

        {/* Contenido principal */}
        <Box sx={{ flex: 1, p: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              mb: 4,
            }}
          >
            Historial de Vuelos
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vuelo</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historial.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.vuelo}</TableCell>
                    <TableCell>{item.tipo}</TableCell>
                    <TableCell>{item.estado}</TableCell>
                    <TableCell>{item.fecha}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => cancelar(item.id)}
                      >
                        Cancelar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert severity={severity} sx={{ width: "100%" }}>
              {mensaje}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Historial;

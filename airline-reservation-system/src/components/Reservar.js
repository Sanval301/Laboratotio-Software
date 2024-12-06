import React, { useState } from "react";
import { Container, Tabs, Tab, Box, Typography } from "@mui/material";
import FormularioTiquetes from "./FormularioTiquetes";
import CarritoCompras from "./CarritoCompras";
import HistorialCR from "./HistorialCR";
import BusquedaTiquetes from "./BusquedaTiquetes";
import NavbarCliente from "./NavbarCliente"; // Asegúrate de que la ruta sea correcta
import Footer from "./Footer"; // Asegúrate de que la ruta sea correcta

const CompraReserva = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Función para manejar el vuelo seleccionado
  const manejarVueloSeleccionado = (vuelo) => {
    setVueloSeleccionado(vuelo);
    setTabIndex(1); // Cambia a la pestaña "Reservar/Comprar"
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavbarCliente />
      <Box sx={{ flex: 1 }}>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Compra y Reserva de Tiquetes
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              aria-label="Tabs de Compra y Reserva"
            >
              <Tab label="Buscar Tiquetes" />
              <Tab label="Reservar/Comprar" />
              <Tab label="Carrito de Compras" />
              <Tab label="Historial" />
            </Tabs>
          </Box>
          {tabIndex === 0 && (
            <BusquedaTiquetes VueloSeleccionado={manejarVueloSeleccionado} />
          )}
          {tabIndex === 1 && (
            <FormularioTiquetes vuelo={vueloSeleccionado} />
          )}
          {tabIndex === 2 && <CarritoCompras />}
          {tabIndex === 3 && <HistorialCR />}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default CompraReserva;

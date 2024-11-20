import React, { useState } from "react";
import { Container, Tabs, Tab, Box, Typography } from "@mui/material";
import FormularioTiquetes from "./FormularioTiquetes";
import CarritoCompras from "./CarritoCompras";
import HistorialCR from "./HistorialCR";
import BusquedaTiquetes from "./BusquedaTiquetes";

const CompraReserva = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
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
          <Tab label="Reservar" />
          <Tab label="Comprar" />
          <Tab label="Carrito de Compras" />
          <Tab label="Historial" />
        </Tabs>
      </Box>
      {tabIndex === 0 && <BusquedaTiquetes />}
      {tabIndex === 1 && <FormularioTiquetes tipo="reserva" />}
      {tabIndex === 2 && <FormularioTiquetes tipo="compra" />}
      {tabIndex === 3 && <CarritoCompras />}
      {tabIndex === 4 && <HistorialCR />}
    </Container>
  );
};

export default CompraReserva;

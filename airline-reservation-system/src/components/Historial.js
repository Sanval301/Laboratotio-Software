// Historial.js
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import MenuLateral from "./MenuLateral";
import FlightIcon from "@mui/icons-material/Flight";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "./Footer";
import NavbarCliente from "./NavbarCliente";
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "visible",
  backgroundColor: "transparent",
  boxShadow: "none",
}));

const CardBackground = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: "linear-gradient(135deg, #FFD194 0%, #D1913C 100%)",
  borderRadius: theme.shape.borderRadius,
  transform: "skew(-5deg)",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
}));

const CardInfo = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.common.white,
  opacity: 0.9,
  position: "relative",
  zIndex: 1,
}));

function Historial() {
  const vuelosHistorial = [
    { id: 1, fecha: "2023-08-20", destino: "Londres", vuelo: "AA101" },
    { id: 2, fecha: "2023-09-15", destino: "Tokio", vuelo: "JL203" },
    { id: 3, fecha: "2023-10-05", destino: "París", vuelo: "AF456" },
  ];

  return(
    <Box display="flex" flexDirection="column" height="100vh">
  <NavbarCliente />
  
  <Box display="flex" flex={1} overflow="auto">
    {/* Menú lateral */}
    <MenuLateral />
    
    {/* Contenedor de las tarjetas */}
    <Box sx={{ flex: 1, p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333", textAlign: "center", mb: 4 }}
      >
        Historial de Vuelos
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "16px",
        }}
      >
        {vuelosHistorial.map((vuelo) => (
          <StyledCard
            key={vuelo.id}
            sx={{ width: "calc(33.33% - 16px)", minHeight: 200 }}
          >
            <CardBackground />
            <CardContent sx={{ position: "relative", zIndex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <FlightIcon fontSize="large" sx={{ color: "white" }} />
                <IconButton size="small" sx={{ color: "white" }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <CardInfo variant="body2">Fecha: {vuelo.fecha}</CardInfo>
              <CardInfo variant="body2">Destino: {vuelo.destino}</CardInfo>
              <CardInfo variant="body2">Vuelo: {vuelo.vuelo}</CardInfo>
            </CardContent>
          </StyledCard>
        ))}
      </Box>
    </Box>
  </Box>
  
  <Footer />
</Box>


  );
}

export default Historial;

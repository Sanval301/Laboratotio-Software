// Promociones.js
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
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeleteIcon from "@mui/icons-material/Delete";

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
  backgroundImage: "linear-gradient(135deg, #A1FFCE 0%, #FAFFD1 100%)",
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

function Promociones() {
  const promociones = [
    {
      id: 1,
      destino: "Madrid",
      descuento: "20%",
      vigencia: "2023-11-01 a 2023-12-31",
    },
    {
      id: 2,
      destino: "Nueva York",
      descuento: "15%",
      vigencia: "2023-12-01 a 2024-01-31",
    },
    {
      id: 3,
      destino: "Cancún",
      descuento: "25%",
      vigencia: "2023-10-20 a 2024-02-28",
    },
  ];

  return (
    <Box display="flex" height="100vh">
      <MenuLateral />

      <Box sx={{ flex: 1, p: 4, overflow: "auto" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333", textAlign: "center", mb: 4 }}
        >
          Promociones de Vuelos
        </Typography>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {promociones.map((promo) => (
            <Grid item xs={12} sm={6} md={4} key={promo.id}>
              <StyledCard sx={{ width: "100%", minHeight: 200 }}>
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
                    <LocalOfferIcon fontSize="large" sx={{ color: "white" }} />
                    <IconButton size="small" sx={{ color: "white" }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <CardInfo variant="body2">Destino: {promo.destino}</CardInfo>
                  <CardInfo variant="body2">
                    Descuento: {promo.descuento}
                  </CardInfo>
                  <CardInfo variant="body2">
                    Vigencia: {promo.vigencia}
                  </CardInfo>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Promociones;

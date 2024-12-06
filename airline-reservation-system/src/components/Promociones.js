import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuLateral from "./MenuLateral";
import NavbarCliente from "./NavbarCliente"; // Importa NavbarCliente
import Footer from "./Footer"; // Importa Footer
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeleteIcon from "@mui/icons-material/Delete";

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
  backgroundImage: "linear-gradient(135deg, #A1A4FF 20%, #EEB3FF 100%)",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
}));

const CardInfo = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: "#000",
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
      vigencia: "2025-01-10 a 2025-01-31",
    },
    {
      id: 2,
      destino: "Nueva York",
      descuento: "15%",
      vigencia: "2024-12-01 a 2024-12-15",
    },
    {
      id: 3,
      destino: "Miami",
      descuento: "25%",
      vigencia: "2024-12-20 a 2025-01-05",
    },
  ];

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <NavbarCliente /> {/* Agrega el NavbarCliente en la parte superior */}
      <Box display="flex" flex={1} overflow="auto">
        <MenuLateral /> {/* Menú lateral */}
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
                      <LocalOfferIcon
                        fontSize="large"
                        sx={{ color: "black" }}
                      />
                      <IconButton size="small" sx={{ color: "black" }}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <CardInfo variant="body2">
                      Destino: {promo.destino}
                    </CardInfo>
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
      <Footer /> {/* Agrega el Footer en la parte inferior */}
    </Box>
  );
}

export default Promociones;

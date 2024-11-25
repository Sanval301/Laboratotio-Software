import React from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Add,
  Edit,
  Cancel,
  Flight,
  CheckCircle,
  Error,
  History,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin"; // Asegúrate de que esta ruta sea correcta
import Footer from "./Footer"; // Asegúrate de que esta ruta sea correcta

const theme = createTheme({
  palette: {
    primary: { main: "#6a1b9a" },
    secondary: { main: "#9A40BD" },
    success: { main: "#6A1B9A" },
    error: { main: "#BD0C06" },
    allow: {main: "#008A1E"}
  },
}); 

export default function AdminVuelos() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <NavbarAdmin /> {/* Navbar al inicio del componente */}
      <Container maxWidth="lg" sx={{ mt: 4, minHeight: "80vh" }}>
        {" "}
        {/* minHeight para mantener contenido y footer en posición correcta */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Ingresa los datos para encontrar tu vuelo.
          </Typography>
        </Box>
        {/* Botones de acciones principales */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            {" "}
            {/* Cambiar md={4} a md={3} */}
            <Button
              fullWidth
              variant="contained"
              color="allow"
              startIcon={<Add />}
              onClick={() => navigate("/crearvuelo")}
              sx={{ height: "60px", fontSize: "1.2rem", color: 'white', // Asegura que el texto sea blanco
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark, // 
                },
          }}
            >
              Crear Vuelo
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<Edit />}
              onClick={() => navigate("/EditarVuelos")}
              sx={{ height: "60px", fontSize: "1.2rem", '&:hover': {
                  backgroundColor: theme.palette.primary.dark, // 
                }, 
              }}
            >
              Editar Vuelo
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<Cancel />}
              onClick={() => navigate("/CancelarVuelos")}
              sx={{ height: "60px", fontSize: "1.2rem", '&:hover': {
                backgroundColor: theme.palette.primary.dark, // 
              }, }}
            >
              Cancelar Vuelo
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              startIcon={<History />}
              onClick={() => navigate("/VuelosRealizados")}
              sx={{ height: "60px", fontSize: "1rem" , '&:hover': {
                backgroundColor: theme.palette.primary.dark, // 
              }, }}
            >
              Vuelos Realizados
            </Button>
          </Grid>
        </Grid>
        {/* Vuelos actuales, activos y cancelados */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Vuelos Actuales
        </Typography>
        <Grid container spacing={3} sx={{ mb: '10%' }}>
          {[
            { id: 1, number: "AA123", status: "En Tiempo", color: "success" },
            { id: 2, number: "IB456", status: "Retrasado", color: "secondary" },
            { id: 3, number: "VY789", status: "Cancelado", color: "error" },
          ].map((flight) => (
            <Grid item xs={12} sm={6} md={4} key={flight.id}>
              <Card raised>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Flight
                    fontSize="large"
                    color={flight.color}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h6">{flight.number}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    {flight.status === "En Tiempo" && (
                      <CheckCircle color="success" />
                    )}
                    {flight.status === "Retrasado" && (
                      <Error color="secondary" />
                    )}
                    {flight.status === "Cancelado" && <Cancel color="error" />}
                    <Typography
                      variant="body1"
                      color={theme.palette[flight.color].main}
                    >
                      {flight.status}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer /> {/* Footer al final del componente */}
    </ThemeProvider>
  );
}

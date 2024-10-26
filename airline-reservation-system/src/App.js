import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Tu Navbar personalizado
import Perfil from "./components/Perfil"; // Importa tu componente de perfil
import Login from "./components/Login"; // Importa tu componente de login
import Registro from "./components/Registro"; //Importa componente de registro
import EditarVuelos from "./components/EditarVuelos"; //Importa componente de Edicion de vuelos
import { useMediaQuery } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    h2: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h5: {
      fontWeight: 600,
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
});

function PaginaPrincipal() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Descubre el mundo con AeroTicket
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            {/* Campos de búsqueda de vuelos */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField select fullWidth label="Origen" defaultValue="">
                <MenuItem value="madrid">Madrid</MenuItem>
                <MenuItem value="barcelona">Barcelona</MenuItem>
                <MenuItem value="sevilla">Sevilla</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField select fullWidth label="Destino" defaultValue="">
                <MenuItem value="paris">París</MenuItem>
                <MenuItem value="londres">Londres</MenuItem>
                <MenuItem value="roma">Roma</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Fecha"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "100%" }}
              >
                Buscar Vuelos
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Ofertas especiales */}
      <Typography variant="h4" gutterBottom>
        Ofertas Especiales
      </Typography>
      <Grid container spacing={3}>
        {[
          {
            destino: "París",
            precio: "199€",
            imagen: "/placeholder.svg?height=200&width=300",
          },
          {
            destino: "Nueva York",
            precio: "499€",
            imagen: "/placeholder.svg?height=200&width=300",
          },
          {
            destino: "Tokio",
            precio: "699€",
            imagen: "/placeholder.svg?height=200&width=300",
          },
        ].map((oferta, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={oferta.imagen}
                alt={`Oferta a ${oferta.destino}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {oferta.destino}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Desde {oferta.precio}
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Ver Oferta
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />

        </Routes>
        <Box
          component="footer"
          sx={{ bgcolor: "primary.main", color: "white", py: 6, mt: 6 }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" align="center">
              © 2024 AeroTicket. Todos los derechos reservados.
            </Typography>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

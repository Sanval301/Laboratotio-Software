import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Select, MenuItem, Container,
  Grid, Card, CardContent, InputLabel, InputBase, IconButton, Box, CardMedia
} from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Perfil from "./components/Perfil";
import Login from "./components/Login";
import Registro from "./components/Registro";

const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a', // Morado oscuro para el color principal
    },
    secondary: {
      main: '#ab47bc', // Color secundario morado más claro
    },
  },
});

const BarraNavegacion = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'purple.600' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>AirTicket</Typography>
        </Link>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {['MI RESERVA', 'Login', 'Perfil',].map((text) => (
            <Link key={text} to={`/${text.toLowerCase().replace(' ', '-')}`} style={{ textDecoration: 'none' }}>
              <Button sx={{ color: 'white' }}>{text}</Button>
            </Link>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', '&:hover': { bgcolor: 'white', color: 'purple.600' } }}>
            Estado del vuelo
          </Button>
          <Select defaultValue="ES" sx={{ color: 'purple.600', bgcolor: 'white', minWidth: 80 }}>
            <MenuItem value="ES">ES</MenuItem>
            <MenuItem value="EN">EN</MenuItem>
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const PieDePagina = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 4 }}>
      <Container>
        <Grid container spacing={4}>
          {[
            { title: 'Sobre Wingo', links: ['Sobre Nosotros', 'Carreras', 'Prensa'] },
            { title: 'Servicio al Cliente', links: ['Contáctenos', 'Preguntas Frecuentes', 'Términos y Condiciones'] },
            { title: 'Servicios', links: ['Reserva de Vuelos', 'Hoteles', 'Alquiler de Autos'] }
          ].map((section, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Typography variant="h6" gutterBottom>{section.title}</Typography>
              <ul>
                {section.links.map((link) => (
                  <li key={link}>
                    <Link to={`/${link.toLowerCase().replace(' ', '-')}`} style={{ textDecoration: 'none' }}>
                      <Button color="inherit">{link}</Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Conéctate con Nosotros</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton aria-label="Facebook" color="inherit"><Facebook /></IconButton>
              <IconButton aria-label="Twitter" color="inherit"><Twitter /></IconButton>
              <IconButton aria-label="Instagram" color="inherit"><Instagram /></IconButton>
              <IconButton aria-label="YouTube" color="inherit"><YouTube /></IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          &copy; 2024 Wingo. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

function PaginaPrincipal() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BarraNavegacion />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Sección de búsqueda de vuelos */}
        <section>
          <Box sx={{
            position: 'relative', height: 500, overflow: 'hidden',
            '& img': { width: '100%', height: '100%', objectFit: 'cover' }
          }}>
            <img src="/playa.jpg" alt="Vista de ciudad costera" />
            <Box sx={{
              position: 'absolute', inset: 0, bgcolor: 'rgba(0, 0, 0, 0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Card sx={{ p: 3, maxWidth: 600, width: '100%' }}>
                <Typography variant="h6" gutterBottom>Encuentra tu vuelo</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputBase placeholder="Origen" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <InputBase placeholder="Destino" fullWidth />
                  </Grid>
                  <Grid item xs={4}>
                    <InputBase type="date" fullWidth />
                  </Grid>
                  <Grid item xs={4}>
                    <InputBase type="date" fullWidth />
                  </Grid>
                  <Grid item xs={4}>
                    <Select fullWidth defaultValue="Pasajeros">
                      <MenuItem value="1">1 Pasajero</MenuItem>
                      <MenuItem value="2">2 Pasajeros</MenuItem>
                      <MenuItem value="3">3 Pasajeros</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
                <Button variant="contained" fullWidth sx={{ mt: 2 }}>¡Vamos!</Button>
              </Card>
            </Box>
          </Box>
        </section>
        
        {/* Sección de beneficios */}
        <section>
          <Container sx={{ py: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>¿Por qué volar con nosotros?</Typography>
            <Grid container spacing={4}>
              {['Tarifas Bajas', 'Experiencia Genial', 'Tus Aliados de Viaje'].map((titulo, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <img src={`/rebajas.jpg`} alt={titulo} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8 }} />
                      <Typography variant="h6" gutterBottom>{titulo}</Typography>
                      <Typography>Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
        
        {/* Sección de promociones de tiquetes baratos */}
        <section>
          <Container sx={{ py: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>Promociones de Tiquetes Baratos</Typography>
            <Grid container spacing={4}>
              {[
                { destino: "París", precio: "199€", imagen: "/tarifas.jpg" },
                { destino: "Nueva York", precio: "499€", imagen: "/playa.jpg" },
                { destino: "Tokio", precio: "699€", imagen: "/playa.jpg" },
              ].map((promo, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={promo.imagen}
                      alt={`Oferta a ${promo.destino}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5">{promo.destino}</Typography>
                      <Typography variant="body2" color="text.secondary">Desde {promo.precio}</Typography>
                      <Button variant="outlined" sx={{ mt: 2 }}>Ver Oferta</Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
      </Box>
      <PieDePagina />
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

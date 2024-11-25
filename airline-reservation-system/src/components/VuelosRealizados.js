import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  FlightTakeoff,
  Schedule,
  Person,
  Search,
  EventAvailable,
  EventNote,
  Info,
} from "@mui/icons-material";
import NavbarAdmin from "./NavbarAdmin"; // Asegúrate de que la ruta sea correcta
import Footer from "./Footer"; // Asegúrate de que la ruta sea correcta

const vuelosRealizados = [
  {
    id: 1,
    numero: "AA123",
    origen: "Pereira",
    destino: "Madrid",
    fecha: "2023-07-11",
    hora: "10:00",
    estado: "Completado",
    pasajeros: 120,
  },
  {
    id: 2,
    numero: "IB456",
    origen: "Bogotá",
    destino: "Miami",
    fecha: "2023-08-21",
    hora: "14:30",
    estado: "Completado",
    pasajeros: 80,
  },
  // Agrega más vuelos de ejemplo
];

export default function VuelosRealizados() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVuelos = vuelosRealizados.filter(
    (vuelo) =>
      vuelo.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuelo.origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuelo.destino.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh" // Hace que el contenedor ocupe toda la pantalla
    >
      <NavbarAdmin /> {/* Navbar fijo en la parte superior */}
      <Box
        component="main"
        flex="1" // Hace que el contenido ocupe el espacio restante
        sx={{ py: 4 }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: "#f8f9fa" }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
              Historial de Vuelos Realizados
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por número de vuelo, origen o destino"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Grid container spacing={3}>
              {filteredVuelos.map((vuelo) => (
                <Grid item xs={12} sm={6} md={4} key={vuelo.id}>
                  <Card raised sx={{ height: "100%" }}>
                    <CardContent>
                      <Box
                        sx={{
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">{vuelo.numero}</Typography>
                        <EventAvailable color="info" />
                      </Box>
                      <Typography color="text.secondary" gutterBottom>
                        <FlightTakeoff
                          sx={{ verticalAlign: "bottom", mr: 1 }}
                        />
                        {vuelo.origen} - {vuelo.destino}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <Schedule sx={{ verticalAlign: "bottom", mr: 1 }} />
                        {vuelo.fecha} {vuelo.hora}
                      </Typography>
                      <Typography variant="body2">
                        <Person sx={{ verticalAlign: "bottom", mr: 1 }} />
                        {vuelo.pasajeros} pasajeros
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Información Importante
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Info color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Este es un historial de vuelos completados." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EventNote color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Revise detalles de cada vuelo realizado." />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
        </Container>
      </Box>
      <Footer /> {/* Footer fijo en la parte inferior */}
    </Box>
  );
}

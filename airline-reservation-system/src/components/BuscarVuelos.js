import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Box,
  Paper,
  Chip,
} from "@mui/material";
import { Search, FlightTakeoff, Schedule, Person } from "@mui/icons-material";
import NavbarCliente from "./NavbarCliente"; // Asegúrate de que la ruta sea correcta
import Footer from "./Footer"; // Asegúrate de que la ruta sea correcta

export default function BuscarVuelo() {
  const [vuelos, setVuelos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5009/obtenervuelos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setVuelos(response.data);
        } else {
          console.error("La respuesta no es válida:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los vuelos:", error);
        alert("Hubo un problema al cargar los vuelos. Intenta nuevamente.");
      });
  }, []);

  const getChipColor = (estado) => {
    switch (estado) {
      case "Programado":
        return "success";
      case "En Espera":
        return "warning";
      case "Embarcando":
        return "info";
      default:
        return "default";
    }
  };

  const filteredVuelos = vuelos.filter(
    (vuelo) =>
      vuelo.CodigoVuelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuelo.Origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuelo.Destino.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavbarCliente />
      <Box component="main" flex="1" sx={{ py: 4 }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: "#f8f9fa" }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
              Búsqueda de Vuelos
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
                <Grid item xs={12} sm={6} md={4} key={vuelo.VueloID}>
                  <Card
                    raised
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6" component="div">
                          {vuelo.CodigoVuelo}
                        </Typography>
                        <Chip
                          label={vuelo.Estado}
                          color={getChipColor(vuelo.Estado)}
                          size="small"
                        />
                      </Box>
                      <Typography color="text.secondary" gutterBottom>
                        <FlightTakeoff
                          sx={{ verticalAlign: "bottom", mr: 1 }}
                        />
                        {vuelo.Origen} - {vuelo.Destino}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <Schedule sx={{ verticalAlign: "bottom", mr: 1 }} />
                        {vuelo.FechaVuelo} {vuelo.HoraSalida}
                      </Typography>
                      <Typography variant="body2">
                        <Person sx={{ verticalAlign: "bottom", mr: 1 }} />
                        {vuelo.Pasajeros} pasajeros
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

import React, { useState, useEffect} from "react";
import axios from "axios"; // Importa axios
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Box,
  Snackbar,
  Paper,
  InputAdornment,
} from "@mui/material";
import {
  Edit,
  FlightTakeoff,
  Schedule,
  Search,
  Person,
} from "@mui/icons-material";
import NavbarAdmin from "./NavbarAdmin"; // Asegúrate de que la ruta sea correcta
import Footer from "./Footer"; // Asegúrate de que la ruta sea correcta
export default function EditarVuelos() {
  const [vuelos, setVuelos] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  // Cargar vuelos desde la API al montar el componente
  useEffect(() => {
    const fetchVuelos = async () => {
      try {
        const response = await axios.get("http://localhost:5009/obtenervuelos"); // Ajusta la URL si es necesario
        setVuelos(response.data); // Asume que la API devuelve los vuelos en el campo 'data'
      } catch (error) {
        console.error("Error al obtener los vuelos", error);
      }
    };
    fetchVuelos();
  }, []);
  const locations = [
    "Pereira",
    "Bogota",
    "Medellin",
    "Cali",
    "Cartagena",
    "Madrid",
    "Londres",
    "New York",
    "Buenos Aires",
    "Miami",
  ];

  const handleOpenDialog = (vuelo) => {
    setSelectedFlight(vuelo);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedFlight(null);
    setOpenDialog(false);
  };

  const handleEditFlight = async () => {
    try {
      console.log("fronted",selectedFlight.VueloID)
      await axios.put(`http://localhost:5009/editarvuelos/${selectedFlight.VueloID}`, selectedFlight); // Actualiza el vuelo
      setSnackbarOpen(true);
      handleCloseDialog();
      navigate("/editarvuelos"); // Redirige a /editarvuelos después de guardar
    } catch (error) {
      console.error("Error al actualizar el vuelo", error);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedFlight((prev) => ({ ...prev, [field]: value }));
  };

  const filteredVuelos = vuelos.filter(
    (vuelo) =>
      vuelo.CodigoVuelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuelo.Origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuelo.Destino.toLowerCase().includes(searchTerm.toLowerCase())
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
          <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f8f9fa" }}>
            <Typography variant="h4" gutterBottom>
              Editar Vuelos
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
                  <Card raised>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6">
                          {vuelo.CodigoVuelo}
                        </Typography>
                        <Chip
                          label={vuelo.Estado}
                          color="primary"
                          size="small"
                        />
                      </Box>
                      <Typography gutterBottom>
                        <FlightTakeoff
                          sx={{ verticalAlign: "bottom", mr: 1 }}
                        />
                        {vuelo.Origen} - {vuelo.Destino}
                      </Typography>
                      <Typography>
                        <Schedule sx={{ verticalAlign: "bottom", mr: 1 }} />
                        {vuelo.FechaVuelo} {vuelo.HoraSalida}
                      </Typography>
                      <Typography>
                        <Person sx={{ verticalAlign: "bottom", mr: 1 }} />
                        {vuelo.Pasajeros} pasajeros
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Edit />}
                        onClick={() => handleOpenDialog(vuelo)}
                        fullWidth
                      >
                        Editar Vuelo
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {selectedFlight && (
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Editar Vuelo</DialogTitle>
              <DialogContent>
                <TextField
                  label="Origen"
                  select
                  fullWidth
                  value={selectedFlight.Origen}
                  onChange={(e) => handleInputChange("Origen", e.target.value)}
                  sx={{ mb: 2 }}
                >
                  {locations.map((loc) => (
                    <MenuItem key={loc} value={loc}>
                      {loc}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Destino"
                  select
                  fullWidth
                  value={selectedFlight.Destino}
                  onChange={(e) => handleInputChange("Destino", e.target.value)}
                  sx={{ mb: 2 }}
                >
                  {locations.map((loc) => (
                    <MenuItem key={loc} value={loc}>
                      {loc}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Fecha de Vuelo"
                  type="date"
                  fullWidth
                  value={selectedFlight.FechaVuelo}
                  onChange={(e) =>
                    handleInputChange("FechaVuelo", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Hora de Salida"
                  type="time"
                  fullWidth
                  value={selectedFlight.HoraSalida}
                  onChange={(e) =>
                    handleInputChange("HoraSalida", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Costo por Persona"
                  type="number"
                  fullWidth
                  value={selectedFlight.CostoPorPersona}
                  onChange={(e) =>
                    handleInputChange("CostoPorPersona", e.target.value)
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">
                  Cancelar
                </Button>
                <Button
                  onClick={handleEditFlight}
                  variant="contained"
                  color="primary"
                >
                  Guardar Cambios
                  
                </Button>
              </DialogActions>
            </Dialog>
          )}

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message="Vuelo editado exitosamente"
          />
        </Container>
      </Box>
      <Footer /> {/* Footer fijo en la parte inferior */}
    </Box>
  );
}

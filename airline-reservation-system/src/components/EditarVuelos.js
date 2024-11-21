import React, { useState } from "react";
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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6a1b9a  ",
    },
    secondary: {
      main: "#ab47bc",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    success: {
      main: "#4caf50",
    },
  },
});
export default function EditarVuelos() {
  const [vuelos, setVuelos] = useState([
    {
      VueloID: 1,
      CodigoVuelo: "AV123",
      Origen: "Bogota",
      Destino: "Cartagena",
      FechaVuelo: "2024-12-01",
      HoraSalida: "08:30",
      Pasajeros: 150,
      CostoPorPersona: 300000,
      Estado: "Activo",
    },
    {
      VueloID: 2,
      CodigoVuelo: "AV456",
      Origen: "Medellin",
      Destino: "Miami",
      FechaVuelo: "2024-12-05",
      HoraSalida: "10:00",
      Pasajeros: 200,
      CostoPorPersona: 500000,
      Estado: "Activo",
    },
    {
      VueloID: 3,
      CodigoVuelo: "AV789",
      Origen: "Cali",
      Destino: "Madrid",
      FechaVuelo: "2024-12-10",
      HoraSalida: "16:45",
      Pasajeros: 250,
      CostoPorPersona: 900000,
      Estado: "Activo",
    },
  ]);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleEditFlight = () => {
    setVuelos((prev) =>
      prev.map((vuelo) =>
        vuelo.VueloID === selectedFlight.VueloID ? selectedFlight : vuelo
      )
    );
    setSnackbarOpen(true);
    handleCloseDialog();
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
    <ThemeProvider theme={theme}>
      <Button
        component={Link}
        to="/adminvuelos"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Regresar a Administración de Vuelos
      </Button>
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
                      <Typography variant="h6">{vuelo.CodigoVuelo}</Typography>
                      <Chip label={vuelo.Estado} color="primary" size="small" />
                    </Box>
                    <Typography gutterBottom>
                      <FlightTakeoff sx={{ verticalAlign: "bottom", mr: 1 }} />
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
    </ThemeProvider>
  );
}

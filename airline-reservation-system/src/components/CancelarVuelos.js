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
  IconButton,
  Chip,
  Box,
  Snackbar,
  TextField,
  InputAdornment,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Cancel,
  FlightTakeoff,
  Schedule,
  Person,
  Search,
  FlightLand,
  Warning,
  Info,
  EventBusy,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
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

// Datos de ejemplo para los vuelos
const vuelosActuales = [
  {
    id: 1,
    numero: "AA123",
    origen: "Pereira",
    destino: "Madrid",
    fecha: "2024-05-11",
    hora: "10:00",
    estado: "Programado",
    pasajeros: 120,
  },
  {
    id: 2,
    numero: "IB456",
    origen: "Bogota",
    destino: "Miami",
    fecha: "2024-11-11",
    hora: "14:30",
    estado: "En Espera",
    pasajeros: 80,
  },
  {
    id: 3,
    numero: "VY789",
    origen: "Medellin",
    destino: "Londres",
    fecha: "2024-31-10",
    hora: "08:45",
    estado: "Embarcando",
    pasajeros: 150,
  },
  {
    id: 4,
    numero: "FR101",
    origen: "Cali",
    destino: "Cartagena",
    fecha: "2024-15-12",
    hora: "12:15",
    estado: "Programado",
    pasajeros: 95,
  },
  {
    id: 5,
    numero: "UX202",
    origen: "Cartagena",
    destino: "New York,",
    fecha: "2024-03-19",
    hora: "16:00",
    estado: "En Espera",
    pasajeros: 110,
  },
];

export default function CancelacionVuelosMejorada() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [vuelos, setVuelos] = useState(vuelosActuales);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenDialog = (vuelo) => {
    setSelectedFlight(vuelo);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFlight(null);
  };

  const handleCancelFlight = () => {
    setVuelos(vuelos.filter((v) => v.id !== selectedFlight.id));
    handleCloseDialog();
    setOpenSnackbar(true);
  };

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
      vuelo.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuelo.origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuelo.destino.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: "#f8f9fa" }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
            Panel de Cancelación de Vuelos
          </Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card raised>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total de Vuelos
                  </Typography>
                  <Typography variant="h4">{vuelos.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card raised>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Pasajeros Afectados
                  </Typography>
                  <Typography variant="h4">
                    {vuelos.reduce(
                      (total, vuelo) => total + vuelo.pasajeros,
                      0
                    )}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card raised>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Vuelos En Espera
                  </Typography>
                  <Typography variant="h4">
                    {
                      vuelos.filter((vuelo) => vuelo.estado === "En Espera")
                        .length
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card raised>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Vuelos Embarcando
                  </Typography>
                  <Typography variant="h4">
                    {
                      vuelos.filter((vuelo) => vuelo.estado === "Embarcando")
                        .length
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
                        {vuelo.numero}
                      </Typography>
                      <Chip
                        label={vuelo.estado}
                        color={getChipColor(vuelo.estado)}
                        size="small"
                      />
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      <FlightTakeoff sx={{ verticalAlign: "bottom", mr: 1 }} />
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
                  <CardActions>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Cancel />}
                      onClick={() => handleOpenDialog(vuelo)}
                      fullWidth
                    >
                      Cancelar Vuelo
                    </Button>
                  </CardActions>
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
                  <ListItemText primary="La cancelación de un vuelo es irreversible." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="error" />
                  </ListItemIcon>
                  <ListItemText primary="Asegúrese de notificar a todos los pasajeros afectados." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EventBusy color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Considere las implicaciones en vuelos Cancelados." />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Procedimiento de Cancelación
              </Typography>
              <ol>
                <li>Verificar la información del vuelo</li>
                <li>Confirmar la necesidad de cancelación</li>
                <li>Notificar al equipo de operaciones</li>
                <li>Iniciar el proceso de reembolso para los pasajeros</li>
                <li>Actualizar el estado del vuelo en el sistema</li>
              </ol>
            </Paper>
          </Grid>
        </Grid>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"¿Está seguro que desea cancelar este vuelo?"}
          </DialogTitle>
          <DialogContent>
            <Typography
              variant="body1"
              id="alert-dialog-description"
              sx={{ mb: 2 }}
            >
              Esta acción no se puede deshacer. Se cancelará el siguiente vuelo:
            </Typography>
            {selectedFlight && (
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  p: 2,
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6">{selectedFlight.numero}</Typography>
                <Typography>
                  {selectedFlight.origen} - {selectedFlight.destino}
                </Typography>
                <Typography>
                  {selectedFlight.fecha} {selectedFlight.hora}
                </Typography>
                <Typography>{selectedFlight.pasajeros} pasajeros</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={handleCancelFlight}
              color="error"
              variant="contained"
              autoFocus
            >
              Sí, Cancelar Vuelo
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message="Vuelo cancelado exitosamente"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpenSnackbar(false)}
            >
              <Cancel fontSize="small" />
            </IconButton>
          }
        />
        <Button
          component={Link}
          to="/adminvuelos"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Regresar a Administración de Vuelos
        </Button>
      </Container>
    </ThemeProvider>
  );
}

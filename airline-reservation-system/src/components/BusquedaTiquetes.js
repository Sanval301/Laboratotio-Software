import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import axios from "axios";

const BusquedaTiquetes = () => {
  const [criterios, setCriterios] = useState({
    origen: "",
    destino: "",
    fechaIda: "",
    fechaVuelta: "",
  });
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setCriterios({ ...criterios, [name]: value });
  };

  const buscarVuelos = async () => {
    try {
      setError(null);
      const response = await axios.get("http://localhost:5009/buscarVuelos", {
        params: criterios,
      });

      if (response.data && response.data.length > 0) {
        setResultados(response.data);
      } else {
        setResultados([]);
        setError("No se encontraron vuelos con los criterios especificados.");
      }
    } catch (error) {
      console.error("Error al buscar vuelos:", error);
      setError("Hubo un problema al realizar la búsqueda. Inténtalo nuevamente.");
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Búsqueda de Tiquetes
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Origen"
            name="origen"
            value={criterios.origen}
            onChange={manejarCambio}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Destino"
            name="destino"
            value={criterios.destino}
            onChange={manejarCambio}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Fecha de Ida"
            name="fechaIda"
            InputLabelProps={{ shrink: true }}
            value={criterios.fechaIda}
            onChange={manejarCambio}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Fecha de Vuelta (opcional)"
            name="fechaVuelta"
            InputLabelProps={{ shrink: true }}
            value={criterios.fechaVuelta}
            onChange={manejarCambio}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={buscarVuelos}>
            Buscar Vuelos
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Resultados
      </Typography>
      <Grid container spacing={2}>
        {resultados.map((vuelo, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Vuelo de {vuelo.Origen} a {vuelo.Destino}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Fecha del Vuelo:</strong> {new Date(vuelo.FechaVuelo).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Hora de Salida:</strong> {vuelo.HoraSalida}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Hora de Llegada:</strong> {vuelo.HoraLlegadaLocal}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Duración:</strong> {vuelo.DuracionVuelo}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Costo por Persona:</strong> ${vuelo.CostoPorPersona}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ mt: "auto", justifyContent: "center" }}>
                <Button variant="outlined" color="primary">
                  Reservar / Comprar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BusquedaTiquetes;

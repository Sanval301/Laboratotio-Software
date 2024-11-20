import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const BusquedaTiquetes = () => {
  const [criterios, setCriterios] = useState({
    origen: "",
    destino: "",
    fechaIda: "",
    fechaVuelta: "",
    clase: "económica",
  });
  const [resultados, setResultados] = useState([]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setCriterios({ ...criterios, [name]: value });
  };

  const buscarVuelos = () => {
    // Ejemplo de resultados estáticos (luego se puede conectar con un backend).
    const vuelosEjemplo = [
      {
        id: 1,
        vuelo: "VU123",
        origen: "Bogotá",
        destino: "Medellín",
        precio: 150,
        clase: "económica",
      },
      {
        id: 2,
        vuelo: "VU456",
        origen: "Bogotá",
        destino: "Cartagena",
        precio: 200,
        clase: "económica",
      },
    ];

    // Filtro básico según criterios
    const resultadosFiltrados = vuelosEjemplo.filter(
      (vuelo) =>
        vuelo.origen.toLowerCase().includes(criterios.origen.toLowerCase()) &&
        vuelo.destino.toLowerCase().includes(criterios.destino.toLowerCase()) &&
        vuelo.clase === criterios.clase
    );

    setResultados(resultadosFiltrados);
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
          <TextField
            fullWidth
            select
            label="Clase"
            name="clase"
            value={criterios.clase}
            onChange={manejarCambio}
            SelectProps={{ native: true }}
          >
            <option value="económica">Económica</option>
            <option value="primera clase">Primera Clase</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={buscarVuelos}>
            Buscar Vuelos
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Resultados
      </Typography>
      <Grid container spacing={2}>
        {resultados.map((vuelo) => (
          <Grid item xs={12} sm={6} md={4} key={vuelo.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Vuelo: {vuelo.vuelo}</Typography>
                <Typography>Origen: {vuelo.origen}</Typography>
                <Typography>Destino: {vuelo.destino}</Typography>
                <Typography>Precio: ${vuelo.precio}</Typography>
                <Typography>Clase: {vuelo.clase}</Typography>
                <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
                  Reservar / Comprar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BusquedaTiquetes;

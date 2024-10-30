import React, { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function EditarVuelos() {
  const [formData, setFormData] = useState({
    origen: "",
    destino: "",
    idVuelo: "",
    hora: new Date(),
    capacidad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      hora: newDate,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del vuelo:", formData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Editar Vuelo
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} noValidate>
          <TextField
            margin="normal"
            fullWidth
            label="Origen"
            name="origen"
            value={formData.origen}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Destino"
            name="destino"
            value={formData.destino}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="ID Vuelo"
            name="idVuelo"
            value={formData.idVuelo}
            onChange={handleChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Hora"
              value={formData.hora}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          </LocalizationProvider>
          <TextField
            margin="normal"
            fullWidth
            label="Capacidad"
            name="capacidad"
            type="number"
            value={formData.capacidad}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#6a1b9a",
              "&:hover": {
                backgroundColor: "#9A40BD",
              },
              fontWeight: "bold",
            }}
          >
            Guardar Cambios
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditarVuelos;

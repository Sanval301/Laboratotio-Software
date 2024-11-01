import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Container,
} from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Registro() {
  const [formData, setFormData] = useState({
    nombreusuario: "",
    nombreCompleto: "",
    email: "",
    contraseña: "",
    genero: "",
    cedula: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    // Llamada al endpoint de registro en el backend
    const response = await axios.post("http://localhost:5004/register", {
      nombreusuario: formData.nombreusuario,
      nombreCompleto: formData.nombreCompleto,
      email: formData.email,
      contraseña: formData.contraseña,
      genero: formData.genero,
      cedula: formData.cedula,
    });
    
    // Guardar el token si el backend lo proporciona
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
  
    alert("Usuario registrado con éxito");
  };
  
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />

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
            Registro de Usuario
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} noValidate>
            <TextField
              margin="normal"
              fullWidth
              label="Nombre de Usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Nombre Completo"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Correo Electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="genero-label">Género</InputLabel>
              <Select
                labelId="genero-label"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
                label="Género"
              >
                <MenuItem value="">
                  <em>Selecciona tu género</em>
                </MenuItem>
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="femenino">Femenino</MenuItem>
                <MenuItem value="otro">Otro</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              label="Cédula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
            />

            {error && (
              <Typography color="error" variant="body2" gutterBottom>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                fontWeight: "bold",
              }}
            >
              Registrarse
            </Button>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

export default Registro;

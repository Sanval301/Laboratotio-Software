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
  Grid,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AccountCircle,
  Email,
  Lock,
  LocationOn,
  Today,
  AssignmentInd,
} from "@mui/icons-material";
import Navbar from "./Navbar";
import Footer from "./Footer";

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "15px",
  backgroundColor: "#fff",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: theme.spacing(7),
  height: theme.spacing(7),
  marginBottom: theme.spacing(2),
}));

function Registro() {
  const [formData, setFormData] = useState({
    nombreusuario: "",
    nombres: "",
    apellidos: "",
    email: "",
    contraseña: "",
    genero: "",
    dni: "",
    fechaNacimiento: "",
    paisNacimiento: "",
    estadoNacimiento: "",
    ciudadNacimiento: "",
    direccionFacturacion: "",
    imagenUsuario: null,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5009/register",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      alert("Usuario registrado con éxito");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error en el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <Container component="main" maxWidth="md">
        <StyledPaper>
          <StyledAvatar>
            <AccountCircle />
          </StyledAvatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Registro de Cliente
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              {/* Información Personal */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="DNI"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <AssignmentInd color="action" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <AccountCircle color="action" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <AccountCircle color="action" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha de Nacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <Today color="action" />,
                  }}
                />
              </Grid>

              {/* Lugar de Nacimiento */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Lugar de Nacimiento
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="País"
                  name="paisNacimiento"
                  value={formData.paisNacimiento}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <LocationOn color="action" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Estado"
                  name="estadoNacimiento"
                  value={formData.estadoNacimiento}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <LocationOn color="action" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Ciudad"
                  name="ciudadNacimiento"
                  value={formData.ciudadNacimiento}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <LocationOn color="action" />,
                  }}
                />
              </Grid>

              {/* Detalles de Cuenta */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <Email color="action" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre de Usuario"
                  name="nombreusuario"
                  value={formData.nombreusuario}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <AccountCircle color="action" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contraseña"
                  name="contraseña"
                  type="password"
                  value={formData.contraseña}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <Lock color="action" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
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
              </Grid>

              {/* Dirección y Foto */}
              <Grid item xs={12}>
                <TextField
                  label="Dirección de Facturación"
                  name="direccionFacturacion"
                  value={formData.direccionFacturacion}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <LocationOn color="action" />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Imagen de Usuario (opcional)"
                  name="imagenUsuario"
                  type="file"
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            {error && (
              <Typography
                color="error"
                variant="body2"
                gutterBottom
                sx={{ mt: 2 }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                backgroundColor: "#6a1b9a",
                "&:hover": { backgroundColor: "#ab47bc" },
                fontWeight: "bold",
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Registrarse"}
            </Button>
          </Box>
        </StyledPaper>
      </Container>

      <Footer />
    </Box>
  );
}

export default Registro;

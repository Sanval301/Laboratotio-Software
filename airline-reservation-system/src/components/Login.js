import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
} from "@mui/material"; // Importa CircularProgress
import axios from "axios";
import Navbar from "./Navbar"; // Importa el Navbar
import Footer from "./Footer"; // Importa el Footer

const Login = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const handleLogin = async () => {
    setError(""); // Limpiar el error anterior
    setLoading(true); // Activar la carga
    try {
      const response = await axios.post("http://localhost:5009/login", {
        // Cambia a 5004 si es necesario
        email,
        contraseña,
      });

      localStorage.setItem("token", response.data.token);
      alert("Inicio de sesión exitoso"); // mandar a inicio dependiendo del perfil
    } catch (err) {
      setError(err.response?.data?.error || "Error en el inicio de sesión");
    } finally {
      setLoading(false); // Desactivar la carga al finalizar
    }
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

      {/* Contenedor principal para el formulario */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 300,
            padding: "20px",
            boxShadow: 3,
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Iniciar Sesión
          </Typography>

          <TextField
            fullWidth
            label="Correo Electrónico"
            margin="normal"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Contraseña"
            margin="normal"
            type="password"
            required
            value={contraseña}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
            disabled={loading} // Desactivar el botón si está cargando
          >
            {loading ? <CircularProgress size={24} /> : "Iniciar Sesión"}{" "}
            {/* Mostrar cargador mientras se espera */}
          </Button>

          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <Link href="/register" underline="hover">
              ¿No tienes cuenta? Registrarse
            </Link>
            <Link href="/Recovery" underline="hover">
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Login;

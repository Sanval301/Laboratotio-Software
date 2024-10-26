import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Enviar los datos al backend
      const response = await axios.post("http://localhost:3000/login", {
        username: email,
        password: password,
      });

      // Guardar el token en el localStorage o manejarlo según lo necesites
      localStorage.setItem("token", response.data.token);
      setError(""); // Limpiar cualquier error previo

      // Redirigir o actualizar el estado según sea necesario
      alert("Inicio de sesión exitoso");
    } catch (err) {
      setError(err.response?.data?.message || "Error en el inicio de sesión");
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        boxShadow: 3,
        borderRadius: "8px",
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
        value={password}
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
      >
        Iniciar Sesión
      </Button>

      <Box mt={2} display="flex" justifyContent="space-between" width="100%">
        <Link href="/Registro" underline="hover">
          ¿No tienes cuenta? Registrarse
        </Link>
        <Link href="#" underline="hover">
          ¿Olvidaste tu contraseña?
        </Link>
      </Box>
    </Box>
  );
};

export default Login;

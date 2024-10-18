import React from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";

const Login = () => {
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
      />

      <TextField
        fullWidth
        label="Contraseña"
        margin="normal"
        type="password"
        required
      />

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
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

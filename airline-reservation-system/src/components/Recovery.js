import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import { Email, ArrowBack } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export default function Recovery() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitud de recuperación enviada para:", email);
    setIsSubmitted(true);
    setOpenSnackbar(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: "100%", borderRadius: 2 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Recuperar Contraseña
        </Typography>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={handleEmailChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Enviar Instrucciones
            </Button>
          </form>
        ) : (
          <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
            Se han enviado las instrucciones de recuperación a tu correo
            electrónico. Por favor, revisa tu bandeja de entrada.
          </Typography>
        )}

        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <Button startIcon={<ArrowBack />} onClick={() => navigate("/login")}>
            Volver al Inicio de Sesión
          </Button>
        </Grid>
      </Paper>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Solicitud de recuperación enviada"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            &#x2715;
          </IconButton>
        }
      />
    </Container>
  );
}

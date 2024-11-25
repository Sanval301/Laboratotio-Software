import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarVisitante = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo y enlace a la página principal */}
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            AeroTicket
          </Typography>
        </Link>

        {/* Opciones básicas */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
            Buscar Vuelos
          </Button>
          <Button color="inherit" component={Link} to="/login" sx={{ mx: 1 }}>
            Iniciar Sesión
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/Register"
            sx={{ mx: 1 }}
          >
            Registrarse
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarVisitante;

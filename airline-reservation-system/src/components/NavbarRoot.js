import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarRoot = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "error.main" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            AeroTicket - Root
          </Typography>
        </Link>

        {/* Opciones del root */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/gestionUsuarios">
            Gestión de Usuarios
          </Button>
          <Button color="inherit" component={Link} to="/configuracion">
            Configuración del Sistema
          </Button>
        </Box>

        {/* Cierre de sesión */}
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { bgcolor: "white", color: "error.main" },
          }}
        >
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarRoot;

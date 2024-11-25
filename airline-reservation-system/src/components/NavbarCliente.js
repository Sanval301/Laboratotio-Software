import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarCliente = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            AeroTicket
          </Typography>
        </Link>

        {/* Opciones del cliente */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Buscar Vuelos
          </Button>
          <Button color="inherit" component={Link} to="/reservar">
            Mis Reservas
          </Button>
          <Button color="inherit" component={Link} to="/promociones">
            Promociones
          </Button>
          <Button color="inherit" component={Link} to="/perfil">
            Perfil
          </Button>
        </Box>

        {/* Cierre de sesión */}
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { bgcolor: "white", color: "primary.main" },
          }}
        >
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarCliente;

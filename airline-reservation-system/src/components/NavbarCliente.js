import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarCliente = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo y enlace a la página principal */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              component="img"
              src="/logo.jpg"
              alt="Logo AirTicket"
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%", // Forma circular
                objectFit: "cover", // Ajustar imagen dentro del contenedor
                marginRight: 1, // Espaciado entre logo y texto
              }}
            />
          </Link>
        <Link
          to="/AdminVuelos"
          style={{ textDecoration: "none", color: "white" }}
        > 
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            AirTicket - cliente
          </Typography>
        </Link>
        </Box>

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

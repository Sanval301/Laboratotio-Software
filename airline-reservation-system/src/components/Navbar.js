import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo y enlace a la página principal */}
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            AeroTicket
          </Typography>
        </Link>

        {/* Enlaces de navegación */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/login" sx={{ mx: 1 }}>
            Iniciar Sesión
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/crearvuelo"
            sx={{ mx: 1 }}
          >
            Reservar
          </Button>
          <Button color="inherit" component={Link} to="/perfil" sx={{ mx: 1 }}>
            Perfil
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/AdminVuelos"
            sx={{ mx: 1 }}
          >
            Administración de Vuelos
          </Button>{" "}
          {/* Esto no va aca se supone que se puede hacer unicamente desde la vista de administrador, se deja aca momentaneamente para uso de vista */}
        </Box>

        {/* Opciones adicionales */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": { bgcolor: "white", color: "primary.main" },
            }}
          >
            Estado del vuelo
          </Button>
          <Select
            defaultValue="ES"
            sx={{ color: "primary.main", bgcolor: "white", minWidth: 80 }}
          >
            <MenuItem value="ES">ES</MenuItem>
            <MenuItem value="EN">EN</MenuItem>
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

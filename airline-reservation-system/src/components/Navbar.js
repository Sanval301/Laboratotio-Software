import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AeroTicket
        </Typography>
        <Button color="inherit" component={Link} to="/login" sx={{ mx: 1 }}>
          Iniciar Sesión
        </Button>
        <Button color="inherit" sx={{ mx: 1 }}>
          Reservar
        </Button>
        <Button color="inherit"  component={Link} to="/Editperfil" sx={{ mx: 1 }}>
          Perfil
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

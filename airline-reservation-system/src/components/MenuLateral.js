// MenuLateral.js
import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Person, CreditCard, History, LocalOffer } from "@mui/icons-material";

const MenuLateral = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { label: "General", icon: <Person />, route: "/Perfil" },
    { label: "Tarjetas", icon: <CreditCard />, route: "/Tarjetas" },
    { label: "Historial", icon: <History />, route: "/Historial" },
    { label: "Promociones", icon: <LocalOffer />, route: "/Promociones" },
  ];

  return (
    <Box width={240} bgcolor="grey.200" p={2}>
      <Typography variant="h6" gutterBottom>
        Configuración
      </Typography>
      <Box display="flex" flexDirection="column">
        {tabs.map((tab) => (
          <Button
            component={Link}
            to={tab.route}
            key={tab.label}
            variant={activeTab === tab.label ? "contained" : "text"}
            startIcon={tab.icon}
            sx={{ justifyContent: "flex-start", mb: 1 }}
          >
            {tab.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default MenuLateral;

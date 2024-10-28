import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "grey.900", color: "white", py: 4 }}>
      <Container>
        <Grid container spacing={4}>
          {/* Secciones del pie de página */}
          {[
            {
              title: "Sobre AirTicket",
              links: ["Sobre Nosotros", "Carreras", "Prensa"],
            },
            {
              title: "Servicio al Cliente",
              links: [
                "Contáctenos",
                "Preguntas Frecuentes",
                "Términos y Condiciones",
              ],
            },
            {
              title: "Servicios",
              links: ["Reserva de Vuelos", "Hoteles", "Alquiler de Autos"],
            },
          ].map((section, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              <ul style={{ padding: 0, listStyleType: "none" }}>
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(" ", "-")}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        color="inherit"
                        sx={{ p: 0, justifyContent: "flex-start" }}
                      >
                        {link}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}

          {/* Redes sociales */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Conéctate con Nosotros
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton aria-label="Facebook" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton aria-label="Twitter" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton aria-label="Instagram" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton aria-label="YouTube" color="inherit">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Derechos reservados */}
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          &copy; 2024 AirTicket. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

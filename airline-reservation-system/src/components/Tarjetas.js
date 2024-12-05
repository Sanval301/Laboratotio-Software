import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  IconButton,
  Fade,
  Slide,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MenuLateral from "./MenuLateral";
import axios from "axios";
import NavbarCliente from "./NavbarCliente";
import Footer from "./Footer";



const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "visible",
  backgroundColor: "transparent",
  boxShadow: "none",
}));

const CardBackground = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage:
    "linear-gradient(135deg, #91EAE4 0%, #86A8E7 50%, #7F7FD5 100%)",
  borderRadius: theme.shape.borderRadius,
  transform: "skew(-5deg)",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
}));

const CardNumber = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  letterSpacing: "0.2em",
  marginBottom: theme.spacing(2),
  color: theme.palette.common.white,
  position: "relative",
}));

const CardInfo = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.common.white,
  opacity: 0.9,
  position: "relative",
}));

function Tarjetas() {
  const [tarjetas, setTarjetas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    numero: "",
    titular: "",
    fechaExpiracion: "",
    cvv: "",
    saldo: "",
  });
  const [compra, setCompra] = useState("");
  const [errorFecha, setErrorFecha] = useState("");

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "fechaExpiracion") {
      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Validar MM/AA
      if (!regex.test(value) && value !== "") {
        setErrorFecha("El formato debe ser MM/AA");
      } else {
        setErrorFecha("");
      }
    }

    setNuevaTarjeta({ ...nuevaTarjeta, [name]: value });
  };

  const handleAgregarTarjeta = async () => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Validación antes de guardar
    if (!regex.test(nuevaTarjeta.fechaExpiracion)) {
      setErrorFecha("El formato debe ser MM/AA");
      return;
    }
  
    if (
      nuevaTarjeta.numero &&
      nuevaTarjeta.titular &&
      nuevaTarjeta.fechaExpiracion &&
      nuevaTarjeta.cvv &&
      nuevaTarjeta.saldo
    ) {
      try {
        // Obtén el token desde el almacenamiento local
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No se encontró el token");
          return; // O mostrar un mensaje de error
        }
  
        // Decodifica el token para obtener nombreUsuario
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const nombreUsuario = decodedToken.nombreUsuario;
        console.log({nombreUsuario})

        if (!decodedToken || !decodedToken.nombreUsuario) {
          throw new Error("El token no contiene el nombre de usuario");
        }
  
        if (!nombreUsuario) {
          console.error("El nombre de usuario no está presente en el token");
          return;
        }
  
        // Añadir nombreUsuario a nuevaTarjeta
        nuevaTarjeta.nombreUsuario = nombreUsuario;
  
        // Envía los datos al backend
        const response = await axios.post(
          "http://localhost:5009/Tarjetas",
          nuevaTarjeta,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        // Si el backend responde exitosamente, agrega la tarjeta al estado local
        setTarjetas([...tarjetas, { ...nuevaTarjeta, id: response.data.id }]);
        handleCloseDialog();
      } catch (error) {
        console.error("Error al guardar la tarjeta:", error.response || error.message);
        alert(`Hubo un error al guardar la tarjeta: ${error.response?.data?.message || error.message}`);
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };
  

  const handleEliminarTarjeta = async (id) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      return;
    }
  
    try {
      // Realiza una solicitud DELETE al backend
      const response = await axios.delete(`http://localhost:5009/deleteTarjetas`,  {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        // Si la eliminación es exitosa, actualiza el estado local
        setTarjetas(tarjetas.filter((tarjeta) => tarjeta.id !== id));
        alert("Tarjeta eliminada exitosamente.");
      } else {
        alert("No se pudo eliminar la tarjeta. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error.response || error.message);
      alert(`Hubo un error al eliminar la tarjeta: ${error.response?.data?.message || error.message}`);
    }
  };
  
  const handleCompra = (id) => {
    const monto = parseFloat(compra);
    if (isNaN(monto) || monto <= 0) return;

    setTarjetas((prev) =>
      prev.map((tarjeta) =>
        tarjeta.id === id
          ? {
              ...tarjeta,
              saldo: Math.max(0, parseFloat(tarjeta.saldo) - monto).toFixed(2),
            }
          : tarjeta
      )
    );
    setCompra("");
  };
  return (
      <Box display="flex" flexDirection="column" height="100vh">
        <NavbarCliente />
        <Box display="flex" flex={1} height="100%">
          {/* Menú lateral */}
          <MenuLateral />
    
          {/* Contenido principal */}
          <Box sx={{ flex: 1, p: 4, overflow: "auto" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                mb: 4,
              }}
            >
              Gestión de Tarjetas de Vuelo
            </Typography>
    
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              {tarjetas.map((tarjeta, index) => (
                <div key={tarjeta.id} style={{ width: "calc(33.333% - 16px)", minWidth: "260px" }}>
                  <Slide
                    direction="up"
                    in={true}
                    mountOnEnter
                    unmountOnExit
                    timeout={300 + index * 100}
                  >
                    <StyledCard style={{ width: "100%", minHeight: "260px" }}>
                      <CardBackground />
                      <CardContent style={{ position: "relative", zIndex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "16px",
                          }}
                        >
                          <Typography
                            variant="h6"
                            style={{ color: "white", fontWeight: "bold" }}
                          >
                            {tarjeta.titular}
                          </Typography>
                          <IconButton
                            onClick={() => handleEliminarTarjeta(tarjeta.id)}
                            size="small"
                            style={{ color: "white" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                        <CardNumber>
                          {tarjeta.numero.replace(/\d{4}(?=.)/g, "$& ")}
                        </CardNumber>
                        <CardInfo>Saldo: ${tarjeta.saldo}</CardInfo>
                      </CardContent>
                    </StyledCard>
                  </Slide>
                </div>
              ))}
    
              {/* Botón de agregar tarjeta */}
              <div style={{ width: "calc(33.333% - 16px)", minWidth: "500px" }}>
                <Fade in={true}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                    fullWidth
                    style={{
                      height: "100%",
                      minHeight: "240px",
                      borderColor: "#7F7FD5",
                      color: "#7F7FD5",
                      borderWidth: "2px",
                      borderStyle: "dashed",
                      "&:hover": {
                        backgroundColor: "rgba(127, 127, 213, 0.1)",
                        borderColor: "#86A8E7",
                      },
                    }}
                  >
                    Agregar Tarjeta
                  </Button>
                </Fade>
              </div>
            </div>
    
            {/* Dialogo de agregar tarjeta */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Agregar Nueva Tarjeta</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  name="numero"
                  label="Número de Tarjeta"
                  type="text"
                  fullWidth
                  value={nuevaTarjeta.numero}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="dense"
                  name="titular"
                  label="Titular"
                  type="text"
                  fullWidth
                  value={nuevaTarjeta.titular}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="dense"
                  name="fechaExpiracion"
                  label="Fecha Expiración (MM/AA)"
                  type="text"
                  fullWidth
                  value={nuevaTarjeta.fechaExpiracion}
                  onChange={handleInputChange}
                  error={!!errorFecha}
                  helperText={errorFecha}
                />
                <TextField
                  margin="dense"
                  name="cvv"
                  label="CVV"
                  type="text"
                  fullWidth
                  value={nuevaTarjeta.cvv}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="dense"
                  name="saldo"
                  label="Saldo Inicial ($)"
                  type="number"
                  fullWidth
                  value={nuevaTarjeta.saldo}
                  onChange={handleInputChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancelar</Button>
                <Button onClick={handleAgregarTarjeta}>Guardar</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
    
        <Footer />
      </Box>        
  );
}

export default Tarjetas;

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

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

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
      const token = localStorage.getItem("token");  // Recuperar el token almacenado
      try {
        // Envía los datos al backend
        
        const response = await axios.post("http://localhost:5009/Tarjetas", nuevaTarjeta);
        
        // Si el backend responde exitosamente, agrega la tarjeta al estado local
        setTarjetas([...tarjetas, { ...nuevaTarjeta, id: response.data.id }]); // Usa el ID generado por el backend si aplica
        setNuevaTarjeta({
          numero: "",
          titular: "",
          fechaExpiracion: "",
          cvv: "",
          saldo: "",
        });
        setErrorFecha("");
        handleCloseDialog();
      } catch (error) {
        console.error("Error al guardar la tarjeta:", error);
        // Manejo del error (puedes mostrar un mensaje al usuario)
      }
    }
  };
  

  const handleEliminarTarjeta = (id) => {
    setTarjetas(tarjetas.filter((tarjeta) => tarjeta.id !== id));
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
    <Box display="flex" height="100vh">
      <MenuLateral />

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
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {tarjetas.map((tarjeta, index) => (
            <Grid item xs={12} sm={6} md={4} key={tarjeta.id}>
              <Slide
                direction="up"
                in={true}
                mountOnEnter
                unmountOnExit
                timeout={300 + index * 100}
              >
                <StyledCard sx={{ width: "100%", minHeight: 260 }}>
                  <CardBackground />
                  <CardContent sx={{ position: "relative", zIndex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "white", fontWeight: "bold" }}
                      >
                        {tarjeta.titular}
                      </Typography>
                      <IconButton
                        onClick={() => handleEliminarTarjeta(tarjeta.id)}
                        size="small"
                        sx={{ color: "white" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <CardNumber>
                      {tarjeta.numero.replace(/\d{4}(?=.)/g, "$& ")}
                    </CardNumber>
                    <CardInfo>Saldo: ${tarjeta.saldo}</CardInfo>
                  </CardContent>
                </StyledCard>
              </Slide>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Fade in={true}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                fullWidth
                sx={{
                  height: "100%",
                  minHeight: 240,
                  borderColor: "#7F7FD5",
                  color: "#7F7FD5",
                  borderWidth: 2,
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
          </Grid>
        </Grid>

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
  );
}

export default Tarjetas;

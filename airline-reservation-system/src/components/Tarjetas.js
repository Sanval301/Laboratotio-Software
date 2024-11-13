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
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import MenuLateral from "./MenuLateral";

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
  "&:hover": {
    "& .airplane-icon": {
      animation: `${floatAnimation} 3s ease-in-out infinite`,
    },
  },
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
  "&:after": {
    content: '""',
    position: "absolute",
    top: "20%",
    left: "-10%",
    right: "-10%",
    bottom: "20%",
    background: "rgba(255, 255, 255, 0.1)",
    transform: "rotate(-5deg)",
  },
}));

const CardNumber = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  letterSpacing: "0.2em",
  marginBottom: theme.spacing(2),
  color: theme.palette.common.white,
  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  position: "relative",
  zIndex: 1,
}));

const CardInfo = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.common.white,
  opacity: 0.9,
  position: "relative",
  zIndex: 1,
}));

function Tarjetas() {
  const [tarjetas, setTarjetas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    numero: "",
    titular: "",
    fechaExpiracion: "",
    cvv: "",
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarjeta({ ...nuevaTarjeta, [name]: value });
  };

  const handleAgregarTarjeta = () => {
    if (
      nuevaTarjeta.numero &&
      nuevaTarjeta.titular &&
      nuevaTarjeta.fechaExpiracion &&
      nuevaTarjeta.cvv
    ) {
      setTarjetas([...tarjetas, { ...nuevaTarjeta, id: Date.now() }]);
      setNuevaTarjeta({
        numero: "",
        titular: "",
        fechaExpiracion: "",
        cvv: "",
      });
      handleCloseDialog();
    }
  };

  const handleEliminarTarjeta = (id) => {
    setTarjetas(tarjetas.filter((tarjeta) => tarjeta.id !== id));
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
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            mb: 4,
          }}
        >
          Mis Tarjetas de Vuelo
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
                <StyledCard sx={{ width: "100%", minHeight: 240 }}>
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
                      <AirplanemodeActiveIcon
                        className="airplane-icon"
                        fontSize="large"
                        sx={{ color: "white" }}
                      />
                      <IconButton
                        onClick={() => handleEliminarTarjeta(tarjeta.id)}
                        size="small"
                        sx={{ color: "white" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <CardNumber variant="body1">
                      {tarjeta.numero.replace(/\d{4}(?=.)/g, "$& ")}
                    </CardNumber>
                    <CardInfo variant="body2">
                      Nombre: {tarjeta.titular}
                    </CardInfo>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <CardInfo variant="body2">
                        Válido hasta: {tarjeta.fechaExpiracion}
                      </CardInfo>
                      <Box
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FlightTakeoffIcon
                          sx={{ fontSize: 16, marginRight: 1, color: "white" }}
                        />
                        <Typography variant="caption" sx={{ color: "white" }}>
                          SKYPASS
                        </Typography>
                      </Box>
                    </Box>
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
                Agregar Nueva Tarjeta de Vuelo
              </Button>
            </Fade>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Agregar Nueva Tarjeta de Vuelo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
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
              label="Nombre del Pasajero"
              type="text"
              fullWidth
              value={nuevaTarjeta.titular}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="fechaExpiracion"
              label="Fecha de Expiración (MM/AA)"
              type="text"
              fullWidth
              value={nuevaTarjeta.fechaExpiracion}
              onChange={handleInputChange}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button
              onClick={handleAgregarTarjeta}
              variant="contained"
              color="primary"
            >
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Tarjetas;

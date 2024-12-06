import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
} from "@mui/material";
import SeatSelection from "./SeatSelection"; // Importa el componente de selección
import NavbarCliente from "./NavbarCliente"; // Asegúrate de que la ruta sea correcta
import Footer from "./Footer"; // Asegúrate de que la ruta sea correcta

export default function CheckIn() {
  const [reservationCode, setReservationCode] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [error, setError] = useState("");
  const [currentSeat, setCurrentSeat] = useState("");
  const [hasChangedBefore, setHasChangedBefore] = useState(false);

  const handleCheckIn = () => {
    if (reservationCode === "") {
      setError("Por favor ingrese un código de reserva o documento válido.");
      return;
    }
    // Simular datos del usuario basados en el código de reserva
    setIsCheckedIn(true);
    setCurrentSeat("12A"); // Ejemplo de asiento asignado
    setError("");
  };

  const handleSeatChange = (newSeat) => {
    setCurrentSeat(newSeat);
    setHasChangedBefore(true);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <NavbarCliente />

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, my: 4 }}>
            <Typography variant="h4" gutterBottom>
              Check-In
            </Typography>
            {!isCheckedIn ? (
              <>
                {error && <Alert severity="error">{error}</Alert>}
                <Box sx={{ my: 2 }}>
                  <TextField
                    fullWidth
                    label="Código de Reserva o Documento"
                    value={reservationCode}
                    onChange={(e) => setReservationCode(e.target.value)}
                  />
                </Box>
                <Button variant="contained" onClick={handleCheckIn}>
                  Confirmar Check-In
                </Button>
              </>
            ) : (
              <SeatSelection
                isInternational={false} // Ejemplo: Nacional
                currentSeat={currentSeat}
                hasChangedBefore={hasChangedBefore}
                isCheckedIn={isCheckedIn}
                onSeatSelect={handleSeatChange}
              />
            )}
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

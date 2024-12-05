import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";

export default function SeatSelection({
  isInternational,
  currentSeat,
  hasChangedBefore,
  isCheckedIn,
  onSeatSelect,
}) {
  const [selectedSeat, setSelectedSeat] = useState(currentSeat);
  const [seatMap, setSeatMap] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);

  useEffect(() => {
    // Generar asientos dinámicamente según el tipo de vuelo
    const totalSeats = isInternational ? 250 : 150;
    const firstClassLimit = isInternational ? 50 : 25;

    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      const row = Math.ceil(i / 6);
      const seatLetter = String.fromCharCode(65 + ((i - 1) % 6)); // 'A' a 'F'
      seats.push({
        id: `${row}${seatLetter}`,
        row,
        seatLetter,
        isFirstClass: i <= firstClassLimit,
        isTaken: Math.random() < 0.2, // Simular algunos asientos ocupados
      });
    }
    setSeatMap(seats);
    setAvailableSeats(seats.filter((seat) => !seat.isTaken));
  }, [isInternational]);

  const handleSeatClick = (seatId) => {
    if (!isCheckedIn || seatId === currentSeat || hasChangedBefore) return;
    setSelectedSeat(seatId);
    onSeatSelect(seatId);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Selección de Asiento
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {isInternational ? "Vuelo Internacional" : "Vuelo Nacional"}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Asiento actual: {currentSeat}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {hasChangedBefore
          ? "No puedes cambiar tu asiento después de hacer Check-In."
          : "Puedes cambiar tu asiento una vez."}
      </Typography>

      <Box sx={{ mt: 3, overflowX: "auto" }}>
        <Grid container spacing={1} sx={{ width: "100%", maxWidth: 800 }}>
          {seatMap.map((seat) => (
            <Grid item xs={1} key={seat.id}>
              <Button
                variant={selectedSeat === seat.id ? "contained" : "outlined"}
                color={
                  seat.isFirstClass
                    ? "warning"
                    : selectedSeat === seat.id
                    ? "primary"
                    : "default"
                }
                disabled={seat.isTaken || !isCheckedIn || hasChangedBefore}
                onClick={() => handleSeatClick(seat.id)}
                sx={{
                  minWidth: "30px",
                  minHeight: "30px",
                  borderRadius: "4px",
                  color: seat.isTaken ? "red" : "inherit",
                }}
              >
                {seat.row + seat.seatLetter}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="success"
          disabled={!selectedSeat || selectedSeat === currentSeat}
          onClick={() =>
            alert(`Confirmado: Asiento ${selectedSeat} asignado con éxito.`)
          }
        >
          Confirmar Asiento
        </Button>
      </Box>
    </Paper>
  );
}

SeatSelection.propTypes = {
  isInternational: PropTypes.bool.isRequired,
  currentSeat: PropTypes.string.isRequired,
  hasChangedBefore: PropTypes.bool.isRequired,
  isCheckedIn: PropTypes.bool.isRequired,
  onSeatSelect: PropTypes.func.isRequired,
};

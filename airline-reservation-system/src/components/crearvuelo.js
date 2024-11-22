// Importaciones necesarias
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Switch,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import axios from "axios";
import { format, addMinutes, parse } from "date-fns";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin"; // Asegúrate de que la ruta sea correcta
import Footer from "./Footer"; // Asegúrate de que la ruta sea correcta

const theme = createTheme({
  palette: {
    primary: { main: "#6a1b9a" },
    secondary: { main: "#ab47bc" },
    info: { main: "#4caf50" },
  },
});

// Función para enviar la información de un vuelo al backend
const createFlight = async (flightData) => {
  try {
    const response = await axios.post(
      "http://localhost:5007/crearvuelo",
      flightData
    );
    console.log(response.data.message);
    alert(response.data.message); // Muestra un mensaje de éxito
  } catch (error) {
    console.error(
      "Error al crear el vuelo:",
      error.response ? error.response.data.message : error.message
    );
    alert(
      "Error al crear el vuelo: " +
        (error.response ? error.response.data.message : error.message)
    );
  }
};

export default function Dash() {
  const [activeTab, setActiveTab] = useState("create-flight");

  const renderContent = () => {
    switch (activeTab) {
      case "create-flight":
        return <CreateFlightForm />;
      default:
        return <CreateFlightForm />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <NavbarAdmin />
      <div
        style={{ display: "flex", height: "100vh", backgroundColor: "#f3f4f6" }}
      >
        <div
          style={{
            width: 250,
            backgroundColor: "#fff",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ padding: 16 }}>
            <Typography variant="h5" color="primary">
              AeroTicket
            </Typography>
          </div>
          <nav>
            <Button
              variant={activeTab === "create-flight" ? "contained" : "text"}
              fullWidth
              onClick={() => setActiveTab("create-flight")}
            >
              Crear Vuelo
            </Button>
          </nav>
        </div>
        <div style={{ flex: 1, padding: 16, overflowY: "auto" }}>
          {renderContent()}
        </div>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

function CreateFlightForm() {
  const [flightCode, setFlightCode] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [isInternational, setIsInternational] = useState(false);
  const [localTimeAdjustment, setLocalTimeAdjustment] = useState("");
  const [estimatedArrival, setEstimatedArrival] = useState("");
  const [costPerPerson, setCostPerPerson] = useState("");

  useEffect(() => {
    setFlightCode(`FL${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  useEffect(() => {
    if (date && time && duration) {
      const [hours, minutes] = duration.split(":").map(Number);
      const departureTime = parse(time, "HH:mm", new Date());
      const arrivalTime = addMinutes(departureTime, hours * 60 + minutes);
      setEstimatedArrival(format(arrivalTime, "HH:mm"));
    }
  }, [date, time, duration]);

  const locations = [
    "Pereira",
    "Bogota",
    "Medellin",
    "Cali",
    "Cartagena",
    "Madrid",
    "Londres",
    "New York",
    "Buenos Aires",
    "Miami",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del formato de duración (HH:MM)
    const durationRegex = /^\d{1,2}:\d{2}$/;
    if (!durationRegex.test(duration)) {
      alert("La duración debe estar en el formato HH:MM.");
      return;
    }

    if (!date || !time || !origin || !destination || !costPerPerson) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    if (origin === destination) {
      alert("El origen y destino no pueden ser iguales.");
      return;
    }

    // Convertir duración a formato HH:MM:SS
    const formattedDuration = duration + ":00";

    // Formatear la fecha a "YYYY-MM-DD"
    const formattedDate = format(date, "yyyy-MM-dd");

    const flightData = {
      CodigoVuelo: flightCode,
      FechaVuelo: formattedDate, // Usar fecha en formato "YYYY-MM-DD"
      HoraSalida: time,
      Origen: origin,
      Destino: destination,
      DuracionVuelo: formattedDuration,
      CostoPorPersona: parseFloat(costPerPerson),
      EsInternacional: isInternational ? 1 : 0,
      HoraLlegadaLocal: estimatedArrival,
    };

    await createFlight(flightData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Crear Vuelo" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
            <TextField
              label="Código de Vuelo"
              value={flightCode}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Fecha de Vuelo"
              type="date"
              value={date ? format(date, "yyyy-MM-dd") : ""}
              onChange={(e) => setDate(new Date(e.target.value))}
              fullWidth
              InputLabelProps={{
                shrink: true, // Esto asegura que la etiqueta no se sobreponga
              }}
              inputProps={{
                placeholder: date ? "" : "dd/mm/aaaa", // Solo muestra placeholder si no hay valor
              }}
            />
            <TextField
              label="Hora de Vuelo"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true, // Esto asegura que la etiqueta no se sobreponga
              }}
              inputProps={{
                placeholder: time ? "" : "hh:mm", // Solo muestra placeholder si no hay valor
              }}
              InputProps={{
                endAdornment: <AccessTime fontSize="small" />,
              }}
            />
            <TextField
              label="Origen"
              select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              fullWidth
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Destino"
              select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              fullWidth
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Duración del Vuelo (HH:MM)"
              placeholder="HH:MM"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              fullWidth
            />
            <Box display="flex" alignItems="center">
              <Switch
                checked={isInternational}
                onChange={(e) => setIsInternational(e.target.checked)}
                inputProps={{ "aria-label": "Es un vuelo internacional" }}
              />
              <Typography>Vuelo Internacional</Typography>
            </Box>
            <TextField
              label="Costo por Persona ($)"
              type="number"
              value={costPerPerson}
              onChange={(e) => setCostPerPerson(e.target.value)}
              fullWidth
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" fullWidth>
            Programar Vuelo
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

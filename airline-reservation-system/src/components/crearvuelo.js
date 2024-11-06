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
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import axios from "axios";
import { format, addMinutes, parse } from "date-fns";

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
    "New York",
    "Los Angeles",
    "Chicago",
    "London",
    "Paris",
    "Tokyo",
    "Sydney",
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
    FechaVuelo: formattedDate,  // Usar fecha en formato "YYYY-MM-DD"
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
          <div style={{ display: "grid", gap: 16 }}>
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
            />
            <TextField
              label="Hora de Vuelo"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              fullWidth
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
              label="Duración del Vuelo"
              placeholder="HH:MM"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              fullWidth
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <Switch
                checked={isInternational}
                onChange={(e) => setIsInternational(e.target.checked)}
              />
              <Typography style={{ marginLeft: 8 }}>
                Vuelo Internacional
              </Typography>
            </div>
            <TextField
              label="Costo por Persona"
              type="number"
              value={costPerPerson}
              onChange={(e) => setCostPerPerson(e.target.value)}
              fullWidth
            />
          </div>
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

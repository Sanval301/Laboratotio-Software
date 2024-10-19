import React, { useState } from "react"; 
import {
  Button,
  TextField,
  Box,
  Avatar,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import {
  CameraAlt,
  Person,
  Work,
  Group,
  Notifications,
} from "@mui/icons-material";

export default function Perfil() {
  const [activeTab, setActiveTab] = useState("General");
  const [profileImage, setProfileImage] = useState("/placeholder.svg");

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box display="flex" height="100vh" bgcolor="background.paper">
      {/* Menú de navegación lateral */}
      <Box width={240} bgcolor="grey.200" p={2}>
        <Typography variant="h6" gutterBottom>
          Configuración
        </Typography>
        <Box display="flex" flexDirection="column">
          {["General", "Perfil", "Cuenta", "Notificaciones"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "contained" : "text"}
              startIcon={
                tab === "General" ? (
                  <Person />
                ) : tab === "Perfil" ? (
                  <Work />
                ) : tab === "Cuenta" ? (
                  <Group />
                ) : (
                  <Notifications />
                )
              }
              onClick={() => setActiveTab(tab)}
              sx={{ justifyContent: "flex-start", mb: 1 }}
            >
              {tab}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Contenido principal */}
      <Box flex={1} p={4} overflow="auto">
        <Typography variant="h4" gutterBottom>
          Configuración de Perfil
        </Typography>
        <Box maxWidth={600} mx="auto">
          <Box display="flex" alignItems="center" mb={4}>
            <Avatar src={profileImage} sx={{ width: 100, height: 100 }} />
            <Box ml={2}>
              <Button
                variant="contained"
                component="label"
                startIcon={<CameraAlt />}
              >
                Cambiar Foto
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>
          </Box>

          <form>
            <Box display="flex" gap={2} mb={2}>
              <TextField fullWidth label="Nombre" />
              <TextField fullWidth label="Apellido" />
            </Box>
            <TextField fullWidth label="Posición" margin="normal" />
            <TextField fullWidth label="Departamento" margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel id="disponibilidad-label">
                Estado de Disponibilidad
              </InputLabel>
              <Select labelId="disponibilidad-label" defaultValue="">
                <MenuItem value="disponible">Disponible</MenuItem>
                <MenuItem value="ocupado">Ocupado</MenuItem>
                <MenuItem value="ausente">Ausente</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Gerente" margin="normal" />

            <Divider sx={{ my: 4 }} />

            <Button variant="contained" color="primary">
              Actualizar Perfil
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

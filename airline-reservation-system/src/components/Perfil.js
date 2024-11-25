import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Avatar,
  Typography,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  CameraAlt,
  Person,
  CreditCard,
  History,
  LocalOffer,
} from "@mui/icons-material";
import MenuLateral from "./MenuLateral";
import { Outlet } from "react-router-dom";
import Navbar from "./NavbarAdmin"

export default function Perfil() {
  const [activeTab, setActiveTab] = useState("General");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    profileImage: "/placeholder.svg",
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@example.com",
    tarjetaFrecuente: "1234-5678-9123-4567",
    genero: "Masculino",
    fechaNacimiento: "1990-01-01",
    paisResidencia: "Colombia",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
 
    <Box display="flex" height="100vh" bgcolor="background.paper">
      {/* Menú lateral para navegar entre secciones */}
      <MenuLateral activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenido principal donde se mostrará cada sección */}
      <Box flex={1} p={4} overflow="auto">
        <Typography variant="h4" gutterBottom>
          Perfil del Usuario
        </Typography>

        {/* Sección dinámica renderizada según la ruta activa */}
        <Outlet />

        {/* Contenido de la sección "General" si es la seleccionada */}
        {activeTab === "General" && (
          <Box maxWidth={600} mx="auto">
            <Box display="flex" alignItems="center" mb={4}>
              <Avatar
                src={userData.profileImage}
                sx={{ width: 100, height: 100 }}
              />
              {isEditing && (
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
              )}
            </Box>

            <form>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                InputProps={{ readOnly: !isEditing }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Apellido"
                name="apellido"
                value={userData.apellido}
                onChange={handleInputChange}
                InputProps={{ readOnly: !isEditing }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                InputProps={{ readOnly: !isEditing }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Tarjeta Frecuente"
                name="tarjetaFrecuente"
                value={userData.tarjetaFrecuente}
                onChange={handleInputChange}
                InputProps={{ readOnly: !isEditing }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                type="date"
                value={userData.fechaNacimiento}
                onChange={handleInputChange}
                InputProps={{ readOnly: !isEditing }}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Género</InputLabel>
                <Select
                  name="genero"
                  value={userData.genero}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  label="Género"
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Femenino">Femenino</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="País de Residencia"
                name="paisResidencia"
                value={userData.paisResidencia}
                onChange={handleInputChange}
                InputProps={{ readOnly: !isEditing }}
                margin="normal"
              />

              <Divider sx={{ my: 4 }} />

              <Button
                variant="contained"
                color="primary"
                onClick={handleEditToggle}
                sx={{ mt: 2 }}
              >
                {isEditing ? "Guardar Cambios" : "Editar Perfil"}
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
}

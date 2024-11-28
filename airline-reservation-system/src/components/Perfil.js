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
import { CameraAlt } from "@mui/icons-material";
import MenuLateral from "./MenuLateral";
import Footer from "./Footer";
import NavbarCliente from "./NavbarCliente"; // Importar NavbarCliente
import { Outlet } from "react-router-dom";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* NavbarCliente en la parte superior */}
      <NavbarCliente />

      {/* Contenido principal */}
      <Box sx={{ display: "flex", flex: 1 }}>
        <MenuLateral activeTab={activeTab} setActiveTab={setActiveTab} />
        <Box flex={1} p={4} overflow="auto">
          <Typography variant="h4" gutterBottom>
            Perfil del Usuario
          </Typography>
          <Avatar
                  src={userData.profileImage}
                  sx={{ width: 120, height: 120, mr: 4 }}
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
          {/* Renderización dinámica de secciones */}
          <Outlet />

          {activeTab === "General" && (
            <Box maxWidth={800} mx="auto" display="flex" alignItems="right" mb={4}>
            
              <Box display="flex" alignItems="right" mb={4}>
                
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

      {/* Footer fijo al final */}
      <Footer />
    </Box>
  );
}

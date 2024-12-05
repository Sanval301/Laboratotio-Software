import { jwtDecode } from "jwt-decode"; // Importación correcta

import React, { useState, useEffect } from "react";
import axios from "axios";
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
import NavbarCliente from "./NavbarCliente";

export default function Perfil() {
  const [activeTab, setActiveTab] = useState("General");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token almacenado
        if (!token) throw new Error("Token no encontrado");
  
        const decoded = jwtDecode(token); // Decodificar el token
        console.log("Datos decodificados del token:", decoded);
  
        // Si el token contiene suficiente información, usa los datos locales
        setUserData({
          nombre: decoded.nombres || "",  // Debería decodificar 'nombres'
          apellido: decoded.apellidos || "",  // Debería decodificar 'apellidos'
          email: decoded.email,
          genero: decoded.genero || "",
          fechaNacimiento: decoded.fechaNacimiento || "",
          paisResidencia: decoded.pais || "",
        });
  
        // Si necesitas más datos, realiza una solicitud al backend
        const response = await axios.get("http://localhost:5009/getUserProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  

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

  if (!userData) {
    return <Typography>Cargando datos del usuario...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavbarCliente />

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
      </Box>
      <Footer />
    </Box>
  );
}

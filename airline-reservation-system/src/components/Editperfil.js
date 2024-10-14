import { useState } from "react";
import { Button, Input, FormLabel, Select, MenuItem, Divider, Avatar, Grid, Typography, Box } from "@mui/material";
import { Camera, User, Briefcase, Users, Bell } from "lucide-react";

export default function ConfiguracionPerfil() {
  const [activeTab, setActiveTab] = useState("General");
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100");

  return (
    <Box display="flex" height="100vh" bgcolor="background.default">
      {/* Menú de navegación lateral */}
      <Box width={250} bgcolor="grey.200" p={2}>
        <Typography variant="h6" gutterBottom>
          Configuración
        </Typography>
        <Box display="flex" flexDirection="column">
          {["General", "Perfil", "Cuenta", "Notificaciones"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "contained" : "outlined"}
              fullWidth
              onClick={() => setActiveTab(tab)}
              sx={{ justifyContent: "flex-start", mb: 1 }}
            >
              {tab === "General" && <User style={{ marginRight: 8 }} />}
              {tab === "Perfil" && <Briefcase style={{ marginRight: 8 }} />}
              {tab === "Cuenta" && <Users style={{ marginRight: 8 }} />}
              {tab === "Notificaciones" && <Bell style={{ marginRight: 8 }} />}
              {tab}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Contenido principal */}
      <Box flex={1} p={3} overflow="auto">
        <Typography variant="h4" gutterBottom>
          Configuración de Perfil
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} container spacing={2} alignItems="center">
            <Grid item>
              <Avatar src={profileImage} alt="Foto de perfil" sx={{ width: 96, height: 96 }} />
            </Grid>
            <Grid item>
              <FormLabel htmlFor="picture" style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                <Camera style={{ marginRight: 8 }} />
                Cambiar foto
              </FormLabel>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                // onChange={handleImageUpload}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormLabel htmlFor="nombre">Nombre</FormLabel>
                  <Input id="nombre" fullWidth placeholder="Tu nombre" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel htmlFor="apellido">Apellido</FormLabel>
                  <Input id="apellido" fullWidth placeholder="Tu apellido" />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel htmlFor="posicion">Posición</FormLabel>
                  <Input id="posicion" fullWidth placeholder="Tu posición en la empresa" />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel htmlFor="departamento">Departamento</FormLabel>
                  <Input id="departamento" fullWidth placeholder="Tu departamento" />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel htmlFor="disponibilidad">Estado de disponibilidad</FormLabel>
                  <Select id="disponibilidad" fullWidth defaultValue="">
                    <MenuItem value="">Selecciona tu estado</MenuItem>
                    <MenuItem value="disponible">Disponible</MenuItem>
                    <MenuItem value="ocupado">Ocupado</MenuItem>
                    <MenuItem value="ausente">Ausente</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <FormLabel htmlFor="gerente">Gerente</FormLabel>
                  <Input id="gerente" fullWidth placeholder="Nombre de tu gerente" />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Button type="submit" variant="contained" fullWidth>
                Actualizar Perfil
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

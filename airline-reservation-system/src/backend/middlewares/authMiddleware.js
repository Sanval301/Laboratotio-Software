const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "No autorizado, falta el token" });
  }

  try {
    // Verificar el token (aquí puedes usar JWT, por ejemplo)
    const decoded = jwt.verify(token, "secreto"); // 'secreto' debe ser tu clave secreta
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = authMiddleware;

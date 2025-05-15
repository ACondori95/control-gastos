const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({message: "No autorizado, no hay token"});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Usuario.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({message: "No autorizado, token inválido"});
  }
};

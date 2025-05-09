const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
};

// Register User
exports.registerUser = async (req, res) => {
  const {fullName, email, password, profileImageUrl} = req.body;

  // Validation: Check for missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({message: "Todos los campos son obligatorios"});
  }

  try {
    // Check if email already exists
    const existingUser = await Usuario.findOne({email});
    if (existingUser) {
      return res
        .status(400)
        .json({message: "El correo electrónico ya está en uso"});
    }

    // Create the user
    const user = await Usuario.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({id: user._id, user, token: generateToken(user._id)});
  } catch (error) {
    res
      .status(500)
      .json({message: "Error al registrar al usuario", error: error.message});
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({message: "Todos los campos son obligatorios"});
  }
  try {
    const user = await Usuario.findOne({email});
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({message: "Credenciales inválidas"});
    }

    res.status(200).json({id: user._id, user, token: generateToken(user._id)});
  } catch (error) {
    res
      .status(500)
      .json({message: "Error al iniciar sesión", error: error.message});
  }
};

// Get User Info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await Usuario.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({message: "Usuario no encontrado"});
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({message: "Error al buscar usuario", error: error.message});
  }
};

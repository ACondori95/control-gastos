const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new mongoose.Schema(
  {
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImageUrl: {type: String, default: null},
  },
  {timestamps: true}
);

// Hash password before saving
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
UsuarioSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Usuario", UsuarioSchema);

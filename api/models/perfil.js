const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PerfilSchema = new Schema({
  nombre: {
    required: true,
    type: String
  },
  categorias: [String],
  busquedas: [String],
  inactivo: Boolean
});

module.exports = mongoose.model("Perfil", PerfilSchema);

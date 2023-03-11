const { Schema, model } = require("mongoose");

const userset = new Schema({
  userID: { type: String },

  uid: { type: String, default: "Não definido" },
  estrelas: { type: Number, default: 0 },

  configuration: {
    dm: { type: Boolean, default: true }
  },
  
  jogos_pontos: {
    snakegame: { type: Number, default: 0 }
  },

  conquistas: {
    snakegame: { type: Boolean, default: false },
    estrelinhas: { type: Boolean, default: false }
  }
  
});


module.exports = model("Mw-Usuarios", userset); 
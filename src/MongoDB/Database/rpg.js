const { Schema, model } = require("mongoose");

const map = new Schema({
  userID: { type: String },
  personagem: { type: String, default: "<:fluttershy:1085301921524502589>" },
  mundo: {
    users: { type: Array },
    nome: { type: String, default: null }
  },

  blocos: {
    madeira: { type: Number, default: 0 },
    pedra: { type: Number, default: 0 }
  },

  item: {
    gravetos: { type: Number, default: 0 }
  },

  picaretas: {
    pedra: { type: Number, default: 0 },
    cobre: { type: Number, default: 0 },
    ferro: { type: Number, default: 0 }
  }
  
})

module.exports = model("Mw-Rpg-User", map);
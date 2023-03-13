const { Schema, model } = require("mongoose");

const map = new Schema({
  userID: { type: String },
  mundo: {
    users: { type: Array },
    nome: { type: String, default: null }
  },

  blocos: {
    madeira: { type: Number, default: 0 }
  }
  
})

module.exports = model("Mw-Rpg-User", map);
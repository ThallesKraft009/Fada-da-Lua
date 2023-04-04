const { Schema, model } = require("mongoose");

let p = {
  x: 0,
  y: 5
}

const map = new Schema({
  userID: { type: String },
  personagem: { type: String, default: "<:fluttershy:1085301921524502589>" },

  mundo: { type: String, default: "Não definido"},
  world: { type: Array },
  player: { type: Array, default: p }
})

module.exports = model("Mw-Rpg-User", map);
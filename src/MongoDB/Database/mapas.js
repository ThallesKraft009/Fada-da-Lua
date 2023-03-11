const { Schema, model } = require("mongoose");

const map = new Schema({
  userID: { type: String },
  mapas: { type: Array }
})

module.exports = model("Mw-Mapas-User", map);
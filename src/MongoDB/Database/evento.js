const { Schema, model } = require("mongoose");

const evento = new Schema({
    
    id: { type: String },
    verificacao: { type: Boolean, default: false },
    time: { type: Number, default: 0 }

})

module.exports = model("Mw-Pascoa-Testes", evento);
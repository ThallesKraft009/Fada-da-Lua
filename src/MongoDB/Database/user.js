const { Schema, model } = require("mongoose");

let mapas = {
  label: "Adicione um mapa",
  description: "Novo mapa na lista",
  value: "0"
}

const userset = new Schema({
  userID: { type: String },

  uid: { type: String, default: "Não definido" },
  mapas: { type: Array, default: mapas },
  mapas_embed: { type: Array },
  estrelas: { type: Number, default: 0 },

  pascoa: {
    ovo_azul: { type: Number, default: 0 },
    ovo_vermelho: { type: Number, default: 0 },
    ovo_verde: { type: Number, default: 0 },
    ovo_dourado: { type: Number, default: 0 },
    pontos: { type: Number, default: 0 },
    time: { type: Number, default: 0 }
  },
  
  moedas: {
    feijao: { type: Number, default: 0 },
    moeda: { type: Number, default: 0 }
  },

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
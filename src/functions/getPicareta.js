const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const minerio = require("../Json/minerio.js");
const picaretas = require("../Json/picaretas.js");

async function MINERA_SELECT(minerios, i, mapa){

  let json = [];
  
  if (minerios === minerio.CARVAO){

    let select = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
					.setCustomId('minerar_cmd')
					.setPlaceholder('Selecione a Picareta')
					.addOptions({
            label: "Pedra",
            description: "Use a Picareta de Pedra pra minerar",
            value: `${picaretas.pedra}`
          },{
            label: "Cobre",
            description: "Use a Picareta de Cobre pra minerar",
            value: `${picaretas.cobre}`
          },{
            label: "Ferro",
            description: "Use a Picareta de Ferro pra minerar",
            value: `${picaretas.ferro}`
          },{
            label: "Pular",
            description: "Não minere esse Minério",
            value: `pular`
          })
    );

      
  }
}

module.exports = { MINERA_SELECT };
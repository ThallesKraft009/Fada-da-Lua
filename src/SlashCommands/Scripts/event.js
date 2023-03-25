const events = {};
events.world = require("../../Json/Scripts/Events/world.json");

events.logic = require("../../Json/Scripts/Events/logic.json");

events.player = require("../../Json/Scripts/Events/player.json");

let choices = [];

events.logic.map(x => {
  
  let a = {
    name: x.name,
    value: x.id
  };

  choices.push(a)
  
});

events.player.map(x => {
  let b = {
    name: x.name,
    value: x.id
  };

  choices.push(b)
})

const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "script",
  description: "Wiki de Scripts",
  type: 1,
  options: [
    {
      name: "evento",
      description: "Busque informações sobre um evento",
      type: 1,
      options: [
        {
          name: "nome",
          description: "Insira o nome do Evento",
          type: 3,
          choices: choices,
          required: true
        }
      ]
    }
  ],

  run: async(client, interaction) => {

    let cmd = interaction.options.getSubcommand();

    let { user } = interaction;

    if (cmd === "evento") {

let evento = interaction.options.getString("nome");

    if (evento.startsWith("logic")){

      let dados = events.logic.filter((x) => x.id === evento);

      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setAuthor({name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}`})
          .setTitle(`**${dados[0].name}**`)
          .setDescription(`${dados[0].description}\n\nParâmetros: ${dados[0].param}`)
          .setColor("Random")
        ]
       })
      
    } else if (evento.startsWith("player")) {

            let dados = events.player.filter((x) => x.id === evento);

      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setAuthor({name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}`})
          .setTitle(`**${dados[0].name}**`)
          .setDescription(`${dados[0].description}\n\nParâmetros: ${dados[0].param}`)
          .setColor("Random")
        ]
       })
      
    }// else if () {
      
    //}
  }
 }
};
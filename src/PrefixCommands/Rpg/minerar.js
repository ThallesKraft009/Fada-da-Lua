const Minerar = require("../../Utils/Minerar.js");
const minerios = require("../../Json/minerio.js");
const picaretas = require("../../Json/picaretas.js");

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
  name: "minerar",

  run: async(client, message, args) => {

    let { author } = message;

     let mundodb = await client.mundodb.findOne({
         userID: author.id
     })
      
     if(!mundodb){
         const newworld = new client.mundodb({ userID: author.id })
         await newworld.save();
         
         mundodb = await client.mundodb.findOne({ userID: author.id })
     };

   // const collector = message.channel.createMessageComponentCollector();

    let botao = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel("Inicie a Mineração")
      .setCustomId(`minerar_${message.author.id}`)
      .setStyle(ButtonStyle.Success)
    );

    const Mineracao = new Minerar(client, message, false, mundodb.personagem);

           console.clear()

    Mineracao.start(async(minerio, picareta) => {
      if (minerio === minerios.CARVAO){

        console.log("minerou carvão!")
        
      } else if (minerio === minerios.COBRE){
        
      } else if (minerio === minerios.FERRO){
        
      }
    })

  }
}
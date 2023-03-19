const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType } = require('discord.js');

const ms = require("ms");

module.exports = {
  name: "criar-picareta",
  aliases: ["criar-picaretas", "picaretas", "picareta"],

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

      if (mundodb.mundo.nome === null) return message.reply({
        content: "Você ainda não criou seu mundo, utilize o comando **\`mw!criar-mundo\`**!"
      })

     let botoes = new ActionRowBuilder()
     .addComponents(
         new ButtonBuilder()
         .setLabel("Picareta de Pedra")
         .setCustomId("picareta_pedra")
         .setStyle(ButtonStyle.Secondary)
       );

let embed = new EmbedBuilder()
     .setAuthor({ name: `${author.tag}`, iconURL: `${author.displayAvatarURL()}` })
     .addFields({
       name: "Picareta de Pedra",
       value: "Precisa de 3 gravetos e 3 Pedras"
     },{
       name: "Picareta de Cobre",
       value: "Precisa de 3 cobres e 3 gravetos"
     })
     .setColor("Random")
     .setTimestamp()

const msg = await message.reply({
  embeds: [embed],
  components: [botoes]
})

    const collector = message.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: ms("10m") });

collector.on('collect', async(i) => {

  if (i.user.id !== author.id) return i.followUp({
    content: `Espere um minuto... você não é ${author}! Sai daqui!`,
    ephemeral: true
  })

  console.log(1, true)

  let gravetos = mundodb.item.gravetos;
     if (gravetos < 3) return i.followUp({
       content: `Você precisa ter pelo menos 3 gravetos!`,
       ephemeral: true
     })

  console.log(2, true, i.customId)

if (i.customId === "picareta_pedra"){

  await i.deferUpdate();

let rochas = mundodb.blocos.pedra;
  
  if (rochas < 3) return i.followUp({
    content: "Você precisa ter 3 rochas/pedras!",
    ephemeral: true
  })

let picareta = mundodb.picaretas.pedra;
  if (picareta >= 200) return i.followUp({
    content: "Você já tem uma picareta de pedra",
    ephemeral: true
  })


await client.mundodb.updateOne({
         userID: i.user.id
     }, { $set: {
         "blocos.pedra": mundodb.blocos.pedra - 3,
        "item.gravetos": mundodb.item.gravetos + 3,
         "picaretas.pedra": 200
     }
     })

return i.followUp({
  content: "Você criou uma picareta de pedra :D",
  ephemeral: true
})

}

  
});

collector.on('end', collected => {

  msg.edit({
    components: []
  })
  
});


   }
}
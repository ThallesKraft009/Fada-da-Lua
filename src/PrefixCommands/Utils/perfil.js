const { ActionRowBuilder, StringSelectMenuBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder } = require("discord.js");

const ms = require("ms");

module.exports = {
  name: "perfil",

  run: async(client, message, args) => {

    let userdb = await client.userdb.findOne({
         userID: message.author.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: message.author.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: message.author.id })
     }

    console.log(userdb.mapas)

    let options = userdb.mapas.map(x => {
      return {
        label: `${x.label}`,
        description: `${x.description}`,
        value: `${x.value}`
      }
    })

let mapas = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('lista_mapas')
					.setPlaceholder('Lista de Mapas')
					.addOptions(options)
			);
  
    const msg = await message.reply({
      content: "testando...",
      components: [mapas]
    });


 const { ComponentType } = require('discord.js');

const collector = message.channel.createMessageComponentCollector({ componentType: ComponentType.StringSelectMenuBuilder, time: 15000 });

collector.on('collect', async(i) => {

  

     if (i.customId === "lista_mapas"){

       let valor = i.values[0];

       if (i.user !== message.author) return i.reply({
         content: "Você não pode adicionar mapas pra outros usuários",
         ephemeral: true
       })


       if (valor === "0"){
         
       let embed_1 = new EmbedBuilder()
          .setTitle("Titulo do seu Mapa")
          .setDescription("Descrição do Mapa")
          .setColor("Random")
          .setImage("https://media.discordapp.net/attachments/1083844524700348517/1084151856126754937/images_28.jpg")

       let botoes_1 = new ActionRowBuilder()
			.addComponents(
           new ButtonBuilder()
        .setLabel("Adicionar Titulo")
        .setCustomId("add_title_map")
        .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
        .setLabel("Adicionar Descrição")
        .setCustomId("add_description_map")
        .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
        .setLabel("Adicionar Imagem")
        .setCustomId("add_img_map")
        .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
        .setLabel("Salvar")
        .setCustomId("save_map")
        .setStyle(ButtonStyle.Success)
       );

       

    await i.update({
       embeds: [embed_1],
       components: [botoes_1]
     });

const collector_buttons = i.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: ms("1h") });

collector_buttons.on("collect", async(interaction) => {

  

  if (interaction.user !== message.author) return interaction.reply({
         content: "Você não pode adicionar mapas pra outros usuários",
         ephemeral: true
       });


        await interaction.deferUpdate()
     

  if (interaction.customId === "add_title_map"){

let collector_msg_1 = interaction.channel.createMessageCollector({ time: ms("1m") });

     interaction.followUp({
       content: `${interaction.user} envie o nome do seu mapa.`,
       ephemeral: true
     });

collector_msg_1.on('collect', async(m) => {

  if (m.author !== message.author) return;
 
  let { content } = m;

        
         m.delete();
  
       // console.log(msg.embeds);

   let embed_msg = msg.embeds[0];

     let embed_builder = new EmbedBuilder()
  .setTitle(`${content}`)
  .setDescription(`${embed_msg.description}`)
  .setImage(`${embed_msg.image.url}`)



       
           
    interaction.editReply({
         embeds: [embed_builder]
    })

    await collector_msg_1.stop();
});
  } else if (interaction.customId === "add_description_map") {

    let collector_msg_2 = interaction.channel.createMessageCollector({ time: ms("1m") });

     interaction.followUp({
       content: `${interaction.user} envie uma descrição do seu mapa.`,
       ephemeral: true
     });

collector_msg_2.on('collect', async(m) => {

  if (m.author !== message.author) return;
 
  let { content } = m;

         
         m.delete();
  
        let embed_msg = msg.embeds[0];
  

     let embed_builder = new EmbedBuilder()
  .setTitle(`${embed_msg.title}`)
  .setDescription(`${content}`)
  .setImage(`${embed_msg.image.url}`)

      
       

    interaction.editReply({
         embeds: [embed_builder]
    })

  
       

    await collector_msg_2.stop();
})
        
       } else if (interaction.customId === "add_img_map"){


    let collector_msg_3 = interaction.channel.createMessageCollector({ time: ms("1m") });

      interaction.followUp({
       content: `${interaction.user} envie uma foto do seu mapa.`,
       ephemeral: true
     });

collector_msg_3.on('collect', async(m) => {

  if (m.author !== message.author) return;


  
         
         m.delete();
  
        let embed_msg = msg.embeds[0];

     let embed_builder = new EmbedBuilder()
       .setTitle(`${embed_msg.title}`)
       .setDescription(`${embed_msg.description}`)

  await collector_msg_3.stop();

          
       

  if (!m.attachments){

    interaction.editReply({
         embeds: [embed_builder]
    })
       } else {


  embed_builder.setImage(`${m.attachments.map(x => x.url)}`)


             
       
    interaction.editReply({
         embeds: [embed_builder]
    })
       }

    
})
    
    } else if (interaction.customId === "save_map"){


let info_map = msg.embeds[0];

    
let jsonMaps = userdb.mapas;

let info_select = {
  label: `${info_map.title}`,
  description: `${info_map.description}`,
  value: `${jsonMaps.length}`
};
               
       jsonMaps.push(info_select)

    let embed_maps = userdb.mapas_embed || {};

      embed_maps.push(info_map);

await client.userdb.updateOne({
         userID: message.author.id
     }, { $set: {
         "mapas": jsonMaps,
         "mapas_embed": embed_maps
     }
     })

    


      return interaction.editReply({
            content: "Use o comando novamente pra carregar os mapas",
            embeds: [],
            components: []
      })
    }
})
} else {

let valor_map = Number(`${valor}`);
         
    
    if (valor_map === 0 || valor_map === "0") valor_map = 1;
         
         let l = userdb.mapas_embed.length;
         
         l = valor_map - 1;

  let msg_embed_mapa = userdb.mapas_embed;

      let h = msg_embed_mapa[l];
      console.log(h)

      /*  let g = new EmbedBuilder()
          .setTitle(`${h.title}`)
          .setDescription(`${h.description}`)
          .setImage(`${h.image.map(x => x.url)}`)
*/
           //    await i.deferUpdate()

         


         
         
      await i.update({
        embeds: [h.data]
     });
}
     }
    });
  }
}
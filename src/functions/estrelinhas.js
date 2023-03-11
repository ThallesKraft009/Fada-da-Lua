const { EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

async function atualizar_msg(client, msg, reagiu){
  
  let msgdb = await client.msg.findOne({
         msgID: msg.id
     })
      
     if(!msgdb){
         const nova_msg = new client.msg({ msgID: msg.id })
         await nova_msg.save();
         
         msgdb = await client.msg.findOne({ msgID: msg.id })
     }

/*
msgID: { type: String },
  msg_bot_id: { type: String },
  reactions: { type: Number },
  estrutura: { type: Array }
*/

  let estrelinhas = msgdb.reactions;

     if (msgdb.reactions === 0) {

       

       let embed = [];

       const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Ir pra a mensagem')
					.setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`)
			);


       let embed_estrutura = new EmbedBuilder()
        .setColor("Yellow")
        .setAuthor({ name: `${msg.author.tag}`, iconURL: `  ${msg.author.displayAvatarURL({ format: 'png' })}`})
    .setDescription(`${msg.content}`)

       

       let img = msg.attachments;

let chat_estrelinhas = client.chat.estrelinhas;
       chat_estrelinhas = client.channels.cache.get(chat_estrelinhas);

       let userdb = await client.userdb.findOne({
         userID: msg.author.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: msg.author.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: msg.author.id })
     }


       await client.userdb.updateOne({
         userID: msg.author.id
     }, { $set: {
         "estrelas": userdb.estrelas + 1
     }
     })

       

const enviar_rank = async function(channel){

  let button_rank = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Rank de Estrelinhas')
					.setStyle(ButtonStyle.Secondary)
          .setCustomId("rank_estrelinhas")
			);

let rank_id = await db.get("msg_id_rank_e");
  if (!rank_id) {
    let msg_rank = await channel.send({
    content: `**Veja o rank atual de estrelinhas apertando no botão!**`,
    components: [button_rank]
  })

await db.set("msg_id_rank_e", `${msg_rank.id}`);

  } else {

    channel.messages.fetch({ message: `${rank_id}`, cache: false, force: true }).then(async(a) => {

         await a.delete();

      let msg_rank = await channel.send({
    content: `**Veja o rank atual de estrelinhas apertando no botão!**`,
    components: [button_rank]
  });

await db.delete("msg_id_rank_2");
await db.set("msg_id_rank_e", `${msg_rank.id}`);
    })
  }
}
       

       if (!img.length) {

         embed.push(embed_estrutura);

        let msg_star = await chat_estrelinhas.send({
           content: `🌟 **${estrelinhas + 1} ** - ${msg.channel}`,
           embeds: embed,
          components: [row]
         });

         enviar_rank(chat_estrelinhas);

    await client.msg.updateOne({
         msgID: msg.id
     }, { $set: {
         "msg_bot_id": msg_star.id,
         "reactions": 1,
         "estrutura": msg
     }
     })

       } else {
         img = img.attachments;

         embed_estrutura.image.url = img;
         embed.push(embed_estrutura)

         let msg_star = await chat_estrelinhas.send({
           content: `🌟 **${estrelinhas + 1} ** - ${msg.channel}`,
           embeds: embed,
           components: [row]
         });

enviar_rank(chat_estrelinhas);


    await client.msg.updateOne({
         msgID: msg.id
     }, { $set: {
         "msg_bot_id": msg_star.id,
         "reactions": 1,
         "estrutura": msg
     }
     })

         
       }
     } else {

       

       let msg_bot_star = msgdb.msg_bot_id;

  client.channels.cache.get(client.chat.estrelinhas).messages.fetch({ message: `${msg_bot_star}`, cache: false, force: true }).then(async(a) => {

      let get_star = msg.reactions;

             a.edit({
               content: `⭐ **${get_star + 1}** - ${msg.channel}`
             });

    await client.msg.updateOne({
         msgID: msg.id
     }, { $set: {
         "reactions": msgdb.reactions + 1,
     }
     })
        
       })
     }
  }



async function remove_reaction(client, msg){

  let msgdb = await client.msg.findOne({
         msgID: msg.id
     })
      
     if(!msgdb){
         const nova_msg = new client.msg({ msgID: msg.id })
         await nova_msg.save();
         
         msgdb = await client.msg.findOne({ msgID: msg.id })
     }

  let reactions = msgdb.reactions - 1;
  let msg_bot_star = msgdb.msg_bot_id;

  let chat_estrelinhas = client.chat.estrelinhas;
       chat_estrelinhas = client.channels.cache.get(chat_estrelinhas);

       let userdb = await client.userdb.findOne({
         userID: msg.author.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: msg.author.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: msg.author.id })
     }

  
  if (reactions === 0) {

    

    chat_estrelinhas.messages.fetch({ message: `${msg_bot_star}`, cache: false, force: true }).then(async(a) => {


      await a.delete();

      await client.userdb.updateOne({
         userID: msg.author.id
     }, { $set: {
         "estrelas": userdb.estrelas - 1
     }
     })

      await client.msg.updateOne({
         msgID: msg.id
     }, { $set: {
         "reactions": 0,
     }
     })
    });
  } else {

    chat_estrelinhas.messages.fetch({ message: `${msg_bot_star}`, cache: false, force: true }).then(async(a) => {

     await a.edit({
       content: `🌟 **${reactions} ** - ${msg.channel}`
     })

await client.msg.updateOne({
         msgID: msg.id
     }, { $set: {
         "reactions": msgdb.reactions - 1,
     }
     })
      
    })
    
  }
}

  module.exports = { atualizar_msg, remove_reaction };
const ms = require("ms");
const { gerarTerreno } = require("./gerar.js");

const sendMsg = async(msg, user, client) => {

  const mapa = new EmbedBuilder()
  .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}`})
  .setDescription("⬛⬛⬛⬛⬛⬛")

  
  let getMsg = await msg.channel.send({
    embeds: [mapa]
  })

  await msg.delete();
  
};
//============ | Criando Mundo! | =============
const criarMundo = async(user, msg, client) => {

  let rpg = await client.mundodb.findOne({
         userID: user.id
     })
      
     if(!userdb){
         const newuser = new client.mundodb({ userID: user.id })
         await newuser.save();
         
         userdb = await client.mundodb.findOne({ userID: user.id })
     }

  if (rpg.mundo){

    sendMsg(msg, user, client)
    
  } else {


    const collector = msg.channel.createMessageCollector({ time: ms("1m") });

    let i = await msg.reply({
      content: "Envie o nome de seu mundo."
    })

    collector.on("collect", async function(m){

      if (m.author.id !== user.id) return;

      let nome = m.content;
      m.delete();

      await client.mundodb.updateOne({
         userID: user.id
     }, { $set: {
         "nome": nome
     }
     })


      sendMsg(msg, user, client);
      i.delete();
    })
  }
     
  
};

module.exports = { criarMundo };
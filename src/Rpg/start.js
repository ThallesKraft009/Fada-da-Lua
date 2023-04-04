const ms = require("ms");
const { criarMundo } = require("./World/create.js")

//=============== | Verificar o UID | =============

const verificar_uid = async(getUid, msg, user, client) => {
  if (getUid === "Não definido"){
    
const collector = msg.channel.createMessageCollector({ time: ms("1m") });

collector.on('collect', async(m) => {
	if (m.author.id !== user.id) return;

  let msgUid = m.content;
  msgUid = Number(`${msgUid}`);
  if (!msg.uid) return m.reply({
    content: `:x: | Envie seu uid corretamente.`
  });

  await client.userdb.updateOne({
         userID: user.id
     }, { $set: {
         "uid": msgUid
     }
     })

  m.delete();

  msg.reactions.removeAll();

  criarMundo(user, msg, client)

  collector.stop();
});
  } else {

criarMundo(user, msg, client)
    
  }
}

//=============== | INICIAR JOGO | ==============

const Play = async(user, msg, client) => {

  let userdb = await client.userdb.findOne({
         userID: user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: user.id })
     }

  let getUid = userdb.uid;
  verificar_uid(getUid, msg, user, client)

  
};

module.exports = { Play };
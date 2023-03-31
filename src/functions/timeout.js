let mutes = [];

const { EmbedBuilder } = require("discord.js");

async function timeout(author, client, objId, time){
  let mural = client.channels.cache.get(`${client.chat.mural}`);
  let time_msg = setTimeout(() => {

    let membro = client.users.cache.get(objId);
    
    let embed = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Parece que alguém aprendeu a falar novamente👀")
    .setDescription(`
    **🎣| Membro(a):** ${membro.tag}
    **🛠️| Staff:** Mute acabou
    **📋| Motivo:** Depois de um longo tempo, o bagunceiro aprendeu com os seus erros e agora está pronto para falar! :D`
    )
    .setTimestamp()
    .setFooter({ text: `ID do Membro: ${membro.id} `})
    .setThumbnail(`${membro.displayAvatarURL()}`)

    mural.send({
      embeds: [embed]
    })
    
  }, time)

   mutes[objId] = {};
   mutes[objId] = time_msg;
   console.log(mutes)
}

async function endTimeout(client, objId, author, reason){
  let membro = client.users.cache.get(objId);
  let mural = client.channels.cache.get(`${client.chat.mural}`);

  let getTimeout = mutes[objId];

  clearTimeout(getTimeout);
  mutes[objId] = null;
  console.log(mutes)
  
         let embed = new EmbedBuilder()
    .setColor("Green")
    .setTitle(
      `Parece que alguém aprendeu a falar novamente👀`
    )
    .setDescription(`
    **🎣| Membro(a):** ${membro.tag}
    **🛠️| Staff:** ${author.tag}
    **📋| Motivo:** ${reason}`
    )
    .setAuthor({ name: `${author.tag}🔨⭐`, iconURL: `${author.displayAvatarURL()}`})
    .setTimestamp()
    .setFooter({ text: `ID do Membro: ${membro.id} `})
    .setThumbnail(`${membro.displayAvatarURL()}`)
    

    mural.send({
      embeds: [embed]
    })
}

module.exports = { timeout, endTimeout };

/*
     const embed = new EmbedBuilder()
    .setColor("Green")
    .setTitle(
      `Parece que alguém aprendeu a falar novamente👀`
    )
    .setDescription(`
      **🎣| Expulso(a):** ${membro.tag}
      **🛠️| Staff:** ${message.author.tag}
      **📋| Motivo:** ${motivo}`
    )
    .setAuthor({ name: `${message.author.tag}🔨⭐`, iconURL: `${message.author.displayAvatarURL()}`})
    .setTimestamp()
    .setFooter({ text: `ID do Membro: ${membro.id} `})
    .setThumbnail(`${membro.displayAvatarURL()}`)
    
*/



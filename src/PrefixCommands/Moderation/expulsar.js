const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "kick",
  aliases: ["expulsar"],

  run: async(client, message, args) => {
    let { guild, author } = message;
 author = guild.members.cache.get(`${author.id}`)

if (!author.permissions.has([PermissionsBitField.Flags.KickMembers])) return message.reply({
  content: `Você não tem permissão de **\`Expulsar Membros\`** pra usar esss comando.`
});

let user;
    if (!message.mentions.members.first()) {
      user = client.users.cache.get(args[0]);
    } else {
      user = message.mentions.users.first();
    }

  if (!user) return message.reply({
    content: `:x: | Mencione alguém ou insira o ID do membro.`
  })

    
    
    const membro = user;
    

    //console.log(user)

    let motivo = args.slice(1).join(' ') || "Bagunçou demais e levou um chute para fora do servidor";

    const embed = new EmbedBuilder()
    .setColor("Yellow")
    .setTitle(`Parece que alguém foi expulso💃`)
    .setDescription(`**🎣| Expulso(a):** ${membro.tag}
**🛠️| Staff:** ${message.author.tag} \n**📋| Motivo:** ${motivo}`)
    .setAuthor({ name: `${message.author.tag}🔨⭐`, iconURL: `${message.author.displayAvatarURL()}`})
    .setTimestamp()
    .setFooter({ text: `ID do Membro: ${membro.id} `})
    .setThumbnail(`${membro.displayAvatarURL()}`)
    message.delete()
    
   let msg = await message.channel.send({
      content: `${author} | Você quer realmente expulsar **\`${membro.tag}\`**?`
   })
    
    msg.react("✅");
    msg.react("❌");

  const filter = (reaction, user) => {
	return user.id === message.author.id;
};

const collector = msg.createReactionCollector({ filter, time: 60000 });

collector.on('collect', async(reaction, user) => {
if (user.id !== message.author.id) return;
  
  if (reaction.emoji.name === "✅"){

  //  await msg.delete();

    await msg.reactions.removeAll();
    
    msg.edit({
      content: `${author} o usuário**\`${membro.tag}\`** foi expulso.`
    });

    let mural = client.channels.cache.get(`${client.chat.mural}`);

    let msg_mural = await mural.send({
      embeds: [embed]
    })
  
    
    await guild.members.kick(membro, { reason: motivo }).catch(e => {
  msg.edit({
    content: `${author} | Não foi possível expulsar **\`${membro.tag}\`**\n\`\`\`js\n${e}\n\`\`\``
  })

      msg_mural.delete();
});
   
    await collector.stop()
  } else if (reaction.emoji.name === "❌"){
    await msg.delete();

    await collector.stop()
  }
});
  }
}
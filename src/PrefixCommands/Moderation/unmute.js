const { PermissionsBitField, EmbedBuilder } = require("discord.js");

const { endTimeout } = require("../../functions/timeout.js");

module.exports = {
  name: "unmute",
  run: async(client, message, args) => {

    let { author, guild } = message;
    author = guild.members.cache.get(author.id)

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
      
    let motivo = args.slice(1).join(' ') || "Depois que a pesssoa aprendeu com os seus erros um membro da staff tirou o mute dele!";
    
    message.delete()
    
  let msg = await message.channel.send({
    content: `Você quer remover o castigo de ${membro}?`
  });

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
      content: `${author} o usuário**\`${membro.tag}\`** foi tirado do castigo `
    });

    let mural = client.channels.cache.get(`${client.chat.mural}`);

    await guild.members.cache.get(`${membro.id}`).timeout(null)
      .then(() => {
        endTimeout(client, membro.id, message.author, motivo)
      })
      .catch(e => {
  msg.edit({
    content: `${author} | Não foi possível remover o castigo de **\`${membro.tag}\`**\n\`\`\`js\n${e}\n\`\`\``
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
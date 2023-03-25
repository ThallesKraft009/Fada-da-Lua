const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "banir",
  aliases: ["ban"],

  run: async(client, message, args) => {
    let { guild, author } = message;
 author = guild.members.cache.get(`${author.id}`)

if (!author.permissions.has([PermissionsBitField.Flags.BanMembers])) return message.reply({
  content: `Você não tem permissão de **\`Banir Membros\`** pra usar esss comando.`
});

    const user = client.users.cache.get(message.mentions.members.first().id) || client.users.cache.get(args[0]);

    
    if (!user) return message.reply({
      content: "Mencione um membro."
    })
    
    const membro = user;

    

    //console.log(user)

    let motivo = args.slice(1).join(' ') || "Não sei, não quero saber, e tenho raiva de quem sabe";

    const embed = new EmbedBuilder()
    .setDescription(`${motivo}`)

    message.delete()
    
   let msg = await message.channel.send({
      content: `${author} | Você quer realmente banir **\`${membro.tag}\`**?`
    })

    msg.react("✅");
    msg.react("❌");

  const filter = (reaction, user) => {
	return user.id === message.author.id;
};

const collector = msg.createReactionCollector({ filter, time: 15000 });

collector.on('collect', async(reaction, user) => {

  if (reaction.emoji.name === "✅"){

  //  await msg.delete();

    await msg.reactions.removeAll();
    
    msg.edit({
      content: `${author} o usuário**\`${membro.tag}\`** foi banido.`
    });

    let mural = client.channels.cache.get(`${client.chat.mural}`);

    let msg_mural = await mural.send({
      embeds: [embed]
    })
  
    
    await guild.members.ban(membro, { reason: motivo }).catch(e => {
  msg.edit({
    content: `${author} | Não foi possível banir **\`${membro.tag}\`**\n\`\`\`js\n${e}\n\`\`\``
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
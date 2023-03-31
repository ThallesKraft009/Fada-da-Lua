const { PermissionsBitField, EmbedBuilder } = require("discord.js");

const { timeout } = require("../../functions/timeout.js");

const ms = require("ms");

module.exports = {
  name: "mute",
  aliases: ["timeout"],

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

// console.log(message)
    
    /*user  = message.mentions.members.first().id || args[0]


   /*args[0] = args[0].replace(/\D/g, "")

    console.log(args[0])conncs
    console.log(user)*/

    const membro = message.guild.members.cache.get(`${user.id}`);

    if (!membro) return;

    let tempo = args[1];
    tempo = ms(`${tempo}`)
    if (!tempo) return message.reply({
      content: `Você precisa especificar o tempo!\nmw!mute @user time motivo`
    })

    //console.log(user)

    let motivo = args.slice(2).join(' ') || "Bagunçou demais e teve que ficar mutado por um tempo😔🤣";

    const embed = new EmbedBuilder()
    .setColor("Orange")
    .setTitle(`Parece que alguém ficou mutado🎙👨‍🎤`)
    .setDescription(`**🎣| Mutado(a):** ${client.users.cache.get(`${membro.id}`).tag}\n**⌛| Duração: **${args[1]}
**🛠️| Staff:** ${message.author.tag} \n**📋| Motivo:** ${motivo}\n\n📝 Se você acha que seu mute foi injusto, siga o formato no <#1023692200086884398>!`)
    .setAuthor({ name: `${message.author.tag}🔨⭐`, iconURL: `${message.author.displayAvatarURL()}`})
    .setTimestamp()
    .setFooter({ text: `ID do Membro: ${membro.id} `})
    .setThumbnail(`${membro.displayAvatarURL()}`)
    //.setImage('https://media.tenor.com/k8bumMQ4DzcAAAAC/mute-shush.gif')

    message.delete()
    
   let msg = await message.channel.send({
      content: `${author} | Você quer realmente castigar **\`${client.users.cache.get(`${membro.id}`).tag}\`** por ${args[1]}?`
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
      content: `${author} o usuário **\`${client.users.cache.get(`${membro.id}`).tag}\`** foi castigado.`
    });

    let mural = client.channels.cache.get(`${client.chat.mural}`);

    let msg_mural = await mural.send({     content: `${membro}`,
     embeds: [embed]
  })
  
    
    await guild.members.cache.get(`${membro.id}`).timeout(tempo, motivo)
      .then(() => {
        timeout(message.author, client, membro.id, tempo)
      })
            .catch(e => {
  msg.edit({
    content: `${author} | Não foi possível castigar **\`${client.users.cache.get(`${membro.id}`).tag}\`**\n\`\`\`js\n${e}\n\`\`\``
  })

      msg_mural.delete();
})
    
   
    await collector.stop()
  } else if (reaction.emoji.name === "❌"){
    await msg.delete();

    await collector.stop()
  }
});
  }
}
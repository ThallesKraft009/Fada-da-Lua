const personagem = require("../../Json/emojis.json");
const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "corrida",

  run: async(client, message, args) => {

    let user;
    if (!message.mentions.members.first()) {
      user = client.users.cache.get(args[0]);
    } else {
      user = message.mentions.users.first();
    }

  if (!user) return message.reply({
    content: `:x: | Mencione alguém ou insira o ID do membro.`
  })

    const mentioned = user;
  /*  if (mentioned === message.author) return msssage.reply({
      content: `❌ | Você não pode se mencionar.`
    })*/

   let mapa = [
     {a:"0123456789"}, {a:"0123456789"}
   ];

    let player = {};
    let adversario = {};

    player.x = 9;
    adversario.x = 9;

    let emoji = "⬛";

    mapa[0].a = mapa[0].a.replace(player.x, "(PLAYER)");


    mapa[1].a = mapa[1].a.replace(adversario.x, "(ADVERSARIO)");

    for (let borda = 0; borda < 10; borda++){

      mapa[0].a = mapa[0].a.replace(`${borda}`, emoji)
      mapa[1].a = mapa[1].a.replace(`${borda}`, emoji)
      continue;
    }

   mapa = `${mapa[0].a}\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n${mapa[1].a}`
    .replace("(PLAYER)", personagem.arell).replace("(ADVERSARIO)", personagem.fluttershy)

   let msg = await message.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle("Corrida Iniciada!")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setDescription(`${personagem.arell} | ${message.author}\n${personagem.fluttershy} | ${mentioned}\n\n${mapa}`)
        .setColor("Blue")
      ]
    })
    
      msg.react(`${personagem.arell}`);
      msg.react(`${personagem.fluttershy}`);

    

const collector = msg.createReactionCollector({ time: ms("5m") });

collector.on('collect', async(reaction, user) => {

  if (reaction.emoji.name === "arell"){

    if (user.id === client.user.id) return;
    if (user.id !== message.author.id) return;

     await reaction.users.remove(user.id);
    mapa = [
      {a:"0123456789"}, {a:"0123456789"}
    ];

    player.x = player.x - 1;
    
    
    mapa[0].a = mapa[0].a.replace(player.x, "(PLAYER)");


    mapa[1].a = mapa[1].a.replace(adversario.x, "(ADVERSARIO)");

  if (player.x === 0) {
for (let a = 0; a < 10; a++){

      mapa[0].a = mapa[0].a.replace(`${a}`, emoji)
      mapa[1].a = mapa[1].a.replace(`${a}`, emoji)
      continue;
}

    msg.reactions.removeAll()

  mapa = `${mapa[0].a}\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n${mapa[1].a}`
    .replace("(PLAYER)", personagem.arell).replace("(ADVERSARIO)", personagem.fluttershy)

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setTitle("Corrida Encerrada!")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setDescription(`${personagem.arell} | ${message.author}\n${personagem.fluttershy} | ${mentioned}\n\n${mapa}`)
        .setColor("Blue")
      ]
    })

        msg.reply({
          content: `👑 | ${user} ganhou a corrida!`
        })
    
   collector.stop();
    return;
  }

    for (let borda_ = 0; borda_ < 10; borda_++){

      mapa[0].a = mapa[0].a.replace(`${borda_}`, emoji)
      mapa[1].a = mapa[1].a.replace(`${borda_}`, emoji)
      continue;
    }

      mapa = `${mapa[0].a}\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n${mapa[1].a}`
    .replace("(PLAYER)", personagem.arell).replace("(ADVERSARIO)", personagem.fluttershy)

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setTitle("Corrida Iniciada!")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setDescription(`${personagem.arell} | ${message.author}\n${personagem.fluttershy} | ${mentioned}\n\n${mapa}`)
        .setColor("Blue")
      ]
    })
    
  } else if (reaction.emoji.name === "fluttershy"){

    if (user.id === client.user.id) return;
    if (user.id !== mentioned.id) return;

     await reaction.users.remove(user.id);
    mapa = [
      {a:"0123456789"}, {a:"0123456789"}
    ];

    adversario.x = adversario.x - 1;
    
    
    mapa[0].a = mapa[0].a.replace(player.x, "(PLAYER)");


    mapa[1].a = mapa[1].a.replace(`${adversario.x}`, "(ADVERSARIO)");

  if (adversario.x === 0) {
for (let a = 0; a < 10; a++){

      mapa[0].a = mapa[0].a.replace(`${a}`, emoji)
      mapa[1].a = mapa[1].a.replace(`${a}`, emoji)
      continue;
}

    msg.reactions.removeAll()

  mapa = `${mapa[0].a}\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n${mapa[1].a}`
    .replace("(PLAYER)", personagem.arell).replace("(ADVERSARIO)", personagem.fluttershy)

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setTitle("Corrida Encerrada!")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setDescription(`${personagem.arell} | ${message.author}\n${personagem.fluttershy} | ${mentioned}\n\n${mapa}`)
        .setColor("Blue")
      ]
    })

        msg.reply({
          content: `👑 | ${user} ganhou a corrida!`
        })
    
   collector.stop();
    return;
  }

    for (let borda_ = 0; borda_ < 10; borda_++){

      mapa[0].a = mapa[0].a.replace(`${borda_}`, emoji)
      mapa[1].a = mapa[1].a.replace(`${borda_}`, emoji)
      continue;
    }

      mapa = `${mapa[0].a}\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n${mapa[1].a}`
    .replace("(PLAYER)", personagem.arell).replace("(ADVERSARIO)", personagem.fluttershy)

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setTitle("Corrida Iniciada!")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setDescription(`${personagem.arell} | ${message.author}\n${personagem.fluttershy} | ${mentioned}\n\n${mapa}`)
        .setColor("Blue")
      ]
    })
    
      }
});
  }
}
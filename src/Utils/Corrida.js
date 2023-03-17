const events = require('events');
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ms = require("ms");

module.exports = class Corrida extends events {
  constructor(client, message, isSlash, pers_1, pers_2){

    if (!message) return;
    if (!isSlash) isSlash = false;

       super();

      this.client = client;
      this.message = message;
      this.isSlash = isSlash;

    this.personagem = pers_1;
    this.personagem_2 = pers_2;
      
    let author;
    
  if (this.isSlash === true) author = message.user;
    if (this.isSlash === false) author = message.author;

    this.author = author;
    
   }

  run(jogador_2, win){


 jogador_2 = this.client.users.cache.get(jogador_2);

    
       let mapa_1 = "9876543210";
       let mapa_2 = "9876543210";

    let player_1 = "(AUTHOR)";
    let player_2 = "(ADVERSÁRIO)";

    let local_1 = 0;
    let local_2 = 0;

    mapa_1 = mapa_1.replace(local_1, player_1);
    mapa_2 = mapa_2.replace(local_2, player_2);

    for (let n = 0; n < 10; n++){
      mapa_1 = mapa_1.replace(n, "⬛");
      mapa_2 = mapa_2.replace(n, "⬛");

        continue;
    }

    let mapa_jogo = `${mapa_1}\n⬛⬛⬛⬛⬛⬛⬛⬛⬛\n${mapa_2}`.replace(player_1, this.personagem).replace(player_2, this.personagem_2)

    let botoes = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setEmoji(this.personagem)
      .setCustomId("player_1_corrida")
      .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
      .setEmoji(this.personagem_2)
      .setCustomId("player_2_corrida")
      .setStyle(ButtonStyle.Primary)
   );

  let embed = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}`})
    .setDescription(`${this.personagem} = ${this.author}\n${this.personagem_2} = ${jogador_2}\n\n${mapa_jogo}`)
    .setColor("Blue")

    this.message.reply({
      components: [botoes],
      embeds: [embed]
    });


  const collector = this.message.channel.createMessageComponentCollector({ time: ms("1h") });

collector.on('collect', async interaction => {

  await interaction.deferUpdate();



  if (interaction.customId === "player_2_corrida"){

if (interaction.user.id !== jogador_2.id) return interaction.followUp({
      content: `Espera um minuto... você não é ${jogador_2}! Sai daqui!`,
      ephemeral: true
    })
    
  mapa_2 = "9876543210";

  local_2 = local_2 + 1;

           

  mapa_2 = mapa_2.replace(local_2, player_2);

  if (local_2 === 9){

    for (let s = 0; s < 10; s++){

  mapa_2 = mapa_2.replace(s, "⬛");

      continue;

  }

  mapa_jogo = `${mapa_1}\n⬛⬛⬛⬛⬛⬛⬛⬛⬛\n${mapa_2}`.replace(player_1, this.personagem).replace(player_2, this.personagem_2)

    embed = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}`})
    .setDescription(`${this.personagem} = ${this.author}\n${this.personagem_2} = ${jogador_2}\n\n${mapa_jogo}`)
    .setColor("Blue")

  interaction.editReply({
    components: [],
    embeds: [embed]
  })

    let feijoes = Math.floor(Math.random() * 200)

    win(interaction.user.id, feijoes)


  interaction.followUp(
    {
      content: `👑 | ${interaction.user} venceu e ganhou <:Mini_feijao:753596313848905808> ${feijoes} mini feijões!`
    }
  );
    

    await collector.stop()
  }

  for (let s = 0; s < 10; s++){

    mapa_2 = mapa_2.replace(s, "⬛");

      continue;

  }



  mapa_jogo = `${mapa_1}\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n${mapa_2}`.replace(player_1, this.personagem).replace(player_2, this.personagem_2)

    embed = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}`})
    .setDescription(`${this.personagem} = ${this.author}\n${this.personagem_2} = ${jogador_2}\n\n${mapa_jogo}`)
    .setColor("Blue")
    
  interaction.editReply({
    embeds: [embed]
  })
  
  }

if (interaction.customId === "player_1_corrida"){

  if (interaction.user.id !== this.author.id) return interaction.followUp({
      content: `Espera um minuto... você não é ${this.author}! Sai daqui!`,
      ephemeral: true
    })

  mapa_1 = "9876543210";

  local_1 = local_1 + 1;

           

  mapa_1 = mapa_1.replace(local_1, player_1);

  if (local_1 === 9){

    for (let s = 0; s < 10; s++){

  mapa_1 = mapa_1.replace(s, "⬛");

      continue;

  }

  mapa_jogo = `${mapa_1}\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n${mapa_2}`.replace(player_1, this.personagem).replace(player_2, this.personagem_2)

    embed = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}`})
    .setDescription(`${this.personagem} = ${this.author}\n${this.personagem_2} = ${jogador_2}\n\n${mapa_jogo}`)
    .setColor("Blue")

  interaction.editReply({
    components: [],
    embeds: [embed]
  })
    let feijoes = Math.floor(Math.random() * 200)

    win(interaction.user.id, feijoes)


  interaction.followUp(
    {
      content: `👑 | ${interaction.user} venceu e ganhou <:Mini_feijao:753596313848905808> ${feijoes} mini feijões!`
    }
  );

    await collector.stop()
  }

  for (let s = 0; s < 10; s++){

    mapa_1 = mapa_1.replace(s, "⬛");

      continue;

  }



  mapa_jogo = `${mapa_1}\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n${mapa_2}`.replace(player_1, this.personagem).replace(player_2, this.personagem_2)


  embed = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}`})
    .setDescription(`${this.personagem} = ${this.author}\n${this.personagem_2} = ${jogador_2}\n\n${mapa_jogo}`)
    .setColor("Blue")

  interaction.editReply({
    embeds: [embed]
  })
  
  }
});
  }
}
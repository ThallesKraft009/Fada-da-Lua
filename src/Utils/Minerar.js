const events = require('events');
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ms = require("ms");

module.exports = class Minerar extends events {
  constructor(client, message, isSlash, personagem){

    if (!message) return;
    if (!isSlash) isSlash = false;

       super();

      this.client = client;
      this.message = message;
      this.isSlash = isSlash;
      this.date = new Date();

    let author;
    
  if (this.isSlash === true) author = message.user;
    if (this.isSlash === false) author = message.author;

    this.author = author;
    this.player = {};
    this.location = {};
    this.embed = {};
    this.embed.author = {};
    this.embed.footer = {};
    this.embed.author.name = `${this.author.tag}`;
    this.embed.author.iconURL = `${this.author.displayAvatarURL()}`; 
    
    this.fundo = "⬛";
    
    this.carvao = {};
    this.carvao.total = 0;
    
    this.cobre = {};
    this.cobre.total = 0;
    
    this.ferro = {};
    this.ferro.total = 0;

    this.personagem = personagem;
    
  }

  start(){

    this.player.x = 0;
    this.player.y = 0;
    this.player.name = "(PLAYER)";
    this.location.x = 0;
    this.location.y = 0;

    this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    let mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

   for (let a = 0; a < 10; a++){

    mapa[0].a = mapa[0].a.replace(a, this.fundo);
    mapa[1].a = mapa[1].a.replace(a, this.fundo);
    mapa[2].a = mapa[2].a.replace(a, this.fundo);
    mapa[3].a = mapa[3].a.replace(a, this.fundo);
    mapa[4].a = mapa[4].a.replace(a, this.fundo);

       continue;
   }

    this.embed.description = `${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem)

    const botoes = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setEmoji("⬅️")
        .setCustomId("minerar_<")
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setEmoji("⬆️")
        .setCustomId("minerar_cima")
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setEmoji("⬇️")
        .setCustomId("minerar_baixo")
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setEmoji("➡️")
        .setCustomId("minerar_>")
        .setStyle(ButtonStyle.Primary)
      );

    this.message.reply({
      embeds: [this.embed],
      components: [botoes]
    });

   const collector = this.message.channel.createMessageComponentCollector({ time: ms("1h") });

collector.on('collect', async i => {

  if (i.customId === "minerar_baixo"){
 
       await i.deferUpdate();

    mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    this.player.y = this.player.y + 1;
    if (this.player.y === 5) this.player.y = 0;

mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

  for (let b = 0; b < 10; b++){

    mapa[0].a = mapa[0].a.replace(b, this.fundo);
    mapa[1].a = mapa[1].a.replace(b, this.fundo);
    mapa[2].a = mapa[2].a.replace(b, this.fundo);
    mapa[3].a = mapa[3].a.replace(b, this.fundo);
    mapa[4].a = mapa[4].a.replace(b, this.fundo);

       continue;
   }

    this.embed.description = `${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem);


this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

   
      i.editReply({
          embeds: [this.embed]
      });

  } else if (i.customId === "minerar_cima") {
    await i.deferUpdate();

    mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    this.player.y = this.player.y - 1;
    if (this.player.y < 0) this.player.y = 4;

mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);


for (let c = 0; c < 10; c++){

    mapa[0].a = mapa[0].a.replace(c, this.fundo);
    mapa[1].a = mapa[1].a.replace(c, this.fundo);
    mapa[2].a = mapa[2].a.replace(c, this.fundo);
    mapa[3].a = mapa[3].a.replace(c, this.fundo);
    mapa[4].a = mapa[4].a.replace(c, this.fundo);

       continue;
   }

    this.embed.description = `${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem);


this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    i.editReply({
       embeds: [this.embed]
      })
    
  } else if (i.customId === "minerar_<"){

    await i.deferUpdate();

    mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    this.player.x = this.player.x - 1;
    if (this.player.x < 0) this.player.x = 9;

    mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

for (let d = 0; d< 10; d++){

    mapa[0].a = mapa[0].a.replace(d, this.fundo);
    mapa[1].a = mapa[1].a.replace(d, this.fundo);
    mapa[2].a = mapa[2].a.replace(d, this.fundo);
    mapa[3].a = mapa[3].a.replace(d, this.fundo);
    mapa[4].a = mapa[4].a.replace(d, this.fundo);

       continue;
      }
    
this.embed.description = `${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem);


this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    i.editReply({
       embeds: [this.embed]
      })

  } else if (i.customId === "minerar_>") {
    await i.deferUpdate();

    mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    this.player.x = this.player.x + 1;
    if (this.player.x === 10) this.player.x = 0;

    mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

for (let e = 0; e < 10; e++){

    mapa[0].a = mapa[0].a.replace(e, this.fundo);
    mapa[1].a = mapa[1].a.replace(e, this.fundo);
    mapa[2].a = mapa[2].a.replace(e, this.fundo);
    mapa[3].a = mapa[3].a.replace(e, this.fundo);
    mapa[4].a = mapa[4].a.replace(e, this.fundo);

       continue;
      }
    
this.embed.description = `${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem);


this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    i.editReply({
       embeds: [this.embed]
      })
  }
});

  }
}
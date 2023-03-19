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
    this.cobre = {};
    this.ferro = {};


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

    this.message.reply({
      embeds: [this.embed]
    });
  }
}
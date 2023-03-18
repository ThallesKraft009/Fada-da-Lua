const events = require('events');
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ms = require("ms");

module.exports = class Corrida extends events {
  constructor(client, message, isSlash){

    if (!message) return;
    if (!isSlash) isSlash = false;

       super();

      this.client = client;
      this.message = message;
      this.isSlash = isSlash;
      
    let author;
    
  if (this.isSlash === true) author = message.user;
    if (this.isSlash === false) author = message.author;

    this.author = author;
    
   }

  start(Voice_channel){

let letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    let letras_number = Math.floor(Math.random() * 25);

 let letra = letras[letras_number];

   }
}
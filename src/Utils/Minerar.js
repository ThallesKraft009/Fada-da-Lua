const events = require('events');
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ComponentType } = require("discord.js");
const ms = require("ms");
const minerio = require("../Json/minerio.js");
const picaretas = require("../Json/picaretas.js");

const users = {};

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
    this.player.x = 0;
    this.player.y = 0;
    this.player.name = "(PLAYER)";

    this.location = {};
    this.embed = {};
    this.embed.author = {};
    this.embed.footer = {};
    this.embed.author.name = `${this.author.tag}`;
    this.embed.author.iconURL = `${this.author.displayAvatarURL()}`; 
    
    this.fundo = "⬛";
    
    this.carvao = {};
    this.carvao.total = 0;
    this.carvao.emoji = "<:Carvao:1087777093225558066>";
    this.carvao.nome = "(CARVAO)";
    this.carvao.x = Math.floor(Math.random() * 9);
    this.carvao.y = Math.floor(Math.random() * 4);
    
    this.cobre = {};
    this.cobre.total = 0;
    this.cobre.emoji = "<:Cobre:1087776496430624880>";
    this.cobre.nome = "(COBRE)";
    let chance = Math.floor(Math.random() * 10);
    this.cobre.chance = false;

      if (chance < 5) this.cobre.chance = true;
      if (chance > 5) this.cobre.chance = false;



    this.cobre.x = Math.floor(Math.random() * 9);
    this.cobre.y = Math.floor(Math.random() * 4);

    this.ferro = {};
    this.ferro.total = 0;

    this.ferro.chance = Math.floor(Math.random() * 20);
if (this.ferro.chance < 10) this.ferro.chance = true;
      if (this.ferro.chance > 10) this.ferro.chance = false;

    this.ferro.x = Math.floor(Math.random() * 9);
    this.ferro.y = Math.floor(Math.random() * 4);
    this.ferro.emoji = "<:Ferro:1087776963684479016>";
    this.ferro.nome = "(FERRO)";

    this.personagem = personagem;
  
    this.collector = this.client.msgC[this.message.channel.id];
    
/*
  if (!users[this.author.id]){

    this.collector = this.message.channel.createMessageComponentCollector({ filter, time: ms("5m") });

users[this.author.id] = this.collector;
    
  }*/
      
    this.botoes = new ActionRowBuilder()
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

          }
  
  async collision(type, i, func){

    let mundodb = await this.client.mundodb.findOne({
         userID: this.author.id
     })
      
     if(!mundodb){
         const newworld = new this.client.mundodb({ userID: this.author.id })
         await newworld.save();
         
         mundodb = await this.client.mundodb.findOne({ userID: this.author.id })
     };

///================== CARVÃO ================///

    let mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];
      
      if (type === minerio.CARVAO){
      
mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];



mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)

if (this.cobre.chance === true) {
     mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);
}
        
    for (let a = 0; a < 10; a++){

    mapa[0].a = mapa[0].a.replace(a, this.fundo);
    mapa[1].a = mapa[1].a.replace(a, this.fundo);
    mapa[2].a = mapa[2].a.replace(a, this.fundo);
    mapa[3].a = mapa[3].a.replace(a, this.fundo);
    mapa[4].a = mapa[4].a.replace(a, this.fundo);

       continue;
   }

        

    this.embed.description = `Carvões: ${this.carvao.total}\nCobres: ${this.cobre.total}\nFerro: ${this.ferro.total}\n\n${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji)

        if (this.cobre.chance === true) {
     this.embed.description = `${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji).replace(this.cobre.nome, this.cobre.emoji)
        }

      this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

  let select = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
					.setCustomId('minerar_cmd_carvao')
					.setPlaceholder('Selecione a Picareta')
					.addOptions({
            label: "Pedra",
            description: "Use a Picareta de Pedra pra minerar",
            value: `${picaretas.pedra}`
          },{
            label: "Cobre",
            description: "Use a Picareta de Cobre pra minerar",
            value: `${picaretas.cobre}`
          },{
            label: "Ferro",
            description: "Use a Picareta de Ferro pra minerar",
            value: `${picaretas.ferro}`
          })
    ); 

      i.update({
          content: "Selecione a Picareta pra Minerar o carvão",
          embeds: [this.embed],
          components: [select, this.botoes]
      });
        
        //================= COBRE =============//
      } 
    
    if (type === minerio.COBRE){

      
        mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)

mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);


for (let b = 0; b < 10; b++){

    mapa[0].a = mapa[0].a.replace(b, this.fundo);
    mapa[1].a = mapa[1].a.replace(b, this.fundo);
    mapa[2].a = mapa[2].a.replace(b, this.fundo);
    mapa[3].a = mapa[3].a.replace(b, this.fundo);
    mapa[4].a = mapa[4].a.replace(b, this.fundo);

       continue;
}

this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

this.embed.description = `${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji).replace(this.cobre.nome, this.cobre.emoji)


  let select = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
					.setCustomId('minerar_cmd_cobre')
					.setPlaceholder('Selecione a Picareta')
					.addOptions({
            label: "Pedra",
            description: "Use a Picareta de Pedra pra minerar",
            value: `${picaretas.pedra}`
          },{
            label: "Cobre",
            description: "Use a Picareta de Cobre pra minerar",
            value: `${picaretas.cobre}`
          },{
            label: "Ferro",
            description: "Use a Picareta de Ferro pra minerar",
            value: `${picaretas.ferro}`
          })
    ); 

    
       i.update({
          content: "Selecione a Picareta pra Minerar o Cobre",
          embeds: [this.embed],
          components: [select, this.botoes]
      });
       
      }
  }
        /*
        picaretas: {
    pedra: { type: Number, default: 0 },
    cobre: { type: Number, default: 0 },
    ferro: { type: Number, default: 0 }
  }
        */

async select_menu(interaction){

  let mundodb = await this.client.mundodb.findOne({
         userID: this.author.id
     })
      
     if(!mundodb){
         const newworld = new this.client.mundodb({ userID: this.author.id })
         await newworld.save();
         
         mundodb = await this.client.mundodb.findOne({ userID: this.author.id })
     };

  /*===================== CARVAO =============*/

  if (interaction.customId === "minerar_cmd_carvao"){

    let valor = interaction.values[0];

    if (valor === `${picaretas.pedra}`){

      let durabilidade = mundodb.picaretas.pedra

      if (durabilidade <= 0) return interaction.reply({
        content: "Você não tem uma picareta de pedra!",
        ephemeral: true
      })

this.carvao.x = Math.floor(Math.random() * 9);
this.carvao.y = Math.floor(Math.random() * 4);

      this.carvao.total = this.carvao.total + 1;

let mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

      mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)

if (this.cobre.chance === true) {
     mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);
}

    this.embed.description = `Carvões: ${this.carvao.total}\nCobres: ${this.cobre.total}\nFerro: ${this.ferro.total}\n\n${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji)

        if (this.cobre.chance === true) {
     this.embed.description = `${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji).replace(this.cobre.nome, this.cobre.emoji)
        }

      this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

      func(minerios.CARVAO, picaretas.pedra);

      interaction.update({
          embeds: [this.embed],
          content: `${this.author} | Continue andando pra minerar os minérios!`,
          components: [this.botoes]
      });

    } else if (valor === `${picaretas.cobre}`){

  let durabilidade = mundodb.picaretas.cobre

      if (durabilidade <= 0) return interaction.reply({
        content: "Você não tem uma picareta de cobre!",
        ephemeral: true
      })

this.carvao.x = Math.floor(Math.random() * 9);
this.carvao.y = Math.floor(Math.random() * 4);

      this.carvao.total = this.carvao.total + 1;

let mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

      mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)

if (this.cobre.chance === true) {
     mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);
}

    this.embed.description = `Carvões: ${this.carvao.total}\nCobres: ${this.cobre.total}\nFerro: ${this.ferro.total}\n\n${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji)

        if (this.cobre.chance === true) {
     this.embed.description = `${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji).replace(this.cobre.nome, this.cobre.emoji)
        }

      this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

      func(minerios.CARVAO, picaretas.pedra);

      interaction.update({
          embeds: [this.embed],
          content: `${this.author} | Continue andando pra minerar os minérios!`,
          components: [this.botoes]
      });
      
    } else if (valor === `${picaretas.ferro}`) {
    let durabilidade = mundodb.picaretas.ferro

      if (durabilidade <= 0) return interaction.reply({
        content: "Você não tem uma picareta de ferro!",
        ephemeral: true
      })

this.carvao.x = Math.floor(Math.random() * 9);
this.carvao.y = Math.floor(Math.random() * 4);

      this.carvao.total = this.carvao.total + 1;

mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

      mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)

if (this.cobre.chance === true) {
     mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);
}

    this.embed.description = `Carvões: ${this.carvao.total}\nCobres: ${this.cobre.total}\nFerro: ${this.ferro.total}\n\n${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji)

        if (this.cobre.chance === true) {
     this.embed.description = `${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji).replace(this.cobre.nome, this.cobre.emoji)
        }

      this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

      func(minerios.CARVAO, picaretas.pedra);

      interaction.update({
          embeds: [this.embed],
          content: `${this.author} | Continue andando pra minerar os minérios!`,
          components: [this.botoes]
      });
    }
    /*=============== COBRE ==============*/
  } else if (interaction.customId === ""){



   }
}

 async start(func){

    
    this.location.x = 0;
    this.location.y = 0;

       this.player = {};
    this.player.x = 0;
    this.player.y = 0;
    this.player.name = "(PLAYER)";

    this.location = {};
    this.embed = {};
    this.embed.author = {};
    this.embed.footer = {};
    this.embed.author.name = `${this.author.tag}`;
    this.embed.author.iconURL = `${this.author.displayAvatarURL()}`; 
    
    this.fundo = "⬛";
    
    this.carvao = {};
    this.carvao.total = 0;
    this.carvao.emoji = "<:Carvao:1087777093225558066>";
    this.carvao.nome = "(CARVAO)";
    this.carvao.x = Math.floor(Math.random() * 9);
    this.carvao.y = Math.floor(Math.random() * 4);
    
    this.cobre = {};
    this.cobre.total = 0;
    this.cobre.emoji = "<:Cobre:1087776496430624880>";
    this.cobre.nome = "(COBRE)";
    let chance = Math.floor(Math.random() * 10);
    this.cobre.chance = false;

      if (chance < 5) this.cobre.chance = true;
      if (chance > 5) this.cobre.chance = false;



    this.cobre.x = Math.floor(Math.random() * 9);
    this.cobre.y = Math.floor(Math.random() * 4);

    this.ferro = {};
    this.ferro.total = 0;

    this.ferro.chance = Math.floor(Math.random() * 20);
if (this.ferro.chance < 10) this.ferro.chance = true;
      if (this.ferro.chance > 10) this.ferro.chance = false;

   

    this.ferro.x = Math.floor(Math.random() * 9);
    this.ferro.y = Math.floor(Math.random() * 4);
    this.ferro.emoji = "<:Ferro:1087776963684479016>";
   this.ferro.nome = "(FERRO)";

console.log(this.ferro, this.cobre, this.carvao, this.player)


    this.personagem = this.personagem;
    this.message = this.message;
  
    this.collector = this.client.msgC[this.message.channel.id];

   this.collector.stop()
   this.client.msgC[this.message.channel.id] = this.message.channel.createMessageComponentCollector();

   this.collector = this.client.msgC[this.message.channel.id];

  
    this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    let mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

    mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)
    
  if (this.cobre.chance === true) {
     mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);
   }

   if (this.ferro.chance === true) {
     mapa[this.ferro.y].a = mapa[this.ferro.y].a.replace(this.ferro.x, this.ferro.nome);
   }
    
   for (let a = 0; a < 10; a++){

    mapa[0].a = mapa[0].a.replace(a, this.fundo);
    mapa[1].a = mapa[1].a.replace(a, this.fundo);
    mapa[2].a = mapa[2].a.replace(a, this.fundo);
    mapa[3].a = mapa[3].a.replace(a, this.fundo);
    mapa[4].a = mapa[4].a.replace(a, this.fundo);

       continue;
   }

    this.embed.description = `Carvões: ${this.carvao.total}\nCobres: ${this.cobre.total}\nFerro: ${this.ferro.total}\n\n${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji)

if (this.cobre.chance === true) {
     this.embed.description = this.embed.description.replace(this.cobre.nome, this.cobre.emoji)
}

  if (this.ferro.chance === true) {
     this.embed.description = this.embed.description.replace(this.ferro.nome, this.ferro.emoji)
      }

    this.message.reply({
      content: `${this.author} | Continue andando pra minerar os minérios!`,
      embeds: [this.embed],
      components: [this.botoes]
    });

   

 this.collector.on("collect", async(i) => {
      
   
this.select_menu(i)

  if (i.customId === "minerar_baixo"){

mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    console.log(mapa)
console.log(this.player)
 
    this.player.y = this.player.y + 1;
    if (this.player.y === 5) this.player.y = 0;

    if (this.player.x === this.carvao.x && this.player.y === this.carvao.y){

      this.collision(minerio.CARVAO, i, func);

    } else {

mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

      console.log("ok")

      mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)

console.log("ok")

      if (this.cobre.chance === true) {
     mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);

console.log(mapa)


        if (this.player.x === this.cobre.x && this.player.y === this.cobre.y){

      this.collision(minerio.COBRE, i, func);

          return;
        }
      }

      if (this.ferro.chance === true) {
     mapa[this.ferro.y].a = mapa[this.ferro.y].a.replace(this.ferro.x, this.ferro.nome);



        if (this.player.x === this.ferro.x && this.player.y === this.ferro.y){

      this.collision(minerio.FERRO, i, func);

          return;
        }
      }

  for (let b = 0; b < 10; b++){
mapa[0].a = mapa[0].a.replace(b, this.fundo);
mapa[1].a = mapa[1].a.replace(b, this.fundo);
    mapa[2].a = mapa[2].a.replace(b, this.fundo);
    mapa[3].a = mapa[3].a.replace(b, this.fundo);
    mapa[4].a = mapa[4].a.replace(b, this.fundo);

       continue;
   }

    this.embed.description = `Carvões: ${this.carvao.total}\nCobres: ${this.cobre.total}\nFerro: ${this.ferro.total}\n\n${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji)

if (this.cobre.chance === true) {
     this.embed.description = this.embed.description.replace(this.cobre.nome, this.cobre.emoji)
}

      if (this.ferro.chance === true) {
     this.embed.description = this.embed.description.replace(this.ferro.nome, this.ferro.emoji)
      }
      
this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

   
      i.update({
          embeds: [this.embed],
          content: `${this.author} | Continue andando pra minerar os minérios!`,
          components: [this.botoes]
      });
    }
  } else if (i.customId === "minerar_cima") {


    mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    this.player.y = this.player.y - 1;
    if (this.player.y < 0) this.player.y = 4;

    if (this.player.x === this.carvao.x && this.player.y === this.carvao.y){

      this.collision(minerio.CARVAO, this.message, func);

    

    } else {

mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

      mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)

      if (this.cobre.chance === true) {
     mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);

        if (this.player.x === this.cobre.x && this.player.y === this.cobre.y){

      this.collision(minerio.COBRE, i, func);

  return;

        }
      }

      if (this.ferro.chance === true) {
     mapa[this.ferro.y].a = mapa[this.ferro.y].a.replace(this.ferro.x, this.ferro.nome);



        if (this.player.x === this.ferro.x && this.player.y === this.ferro.y){

      this.collision(minerio.FERRO, i, func);

          return;
        }
      }

for (let c = 0; c < 10; c++){

    mapa[0].a = mapa[0].a.replace(c, this.fundo);
    mapa[1].a = mapa[1].a.replace(c, this.fundo);
    mapa[2].a = mapa[2].a.replace(c, this.fundo);
    mapa[3].a = mapa[3].a.replace(c, this.fundo);
    mapa[4].a = mapa[4].a.replace(c, this.fundo);

       continue;
   }

    this.embed.description = `Carvões: ${this.carvao.total}\nCobres: ${this.cobre.total}\nFerro: ${this.ferro.total}\n\n${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji)

      if (this.cobre.chance === true) {
     this.embed.description = this.embed.description.replace(this.cobre.nome, this.cobre.emoji)
}

      if (this.ferro.chance === true) {
     this.embed.description = this.embed.description.replace(this.ferro.nome, this.ferro.emoji)
      }

this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    i.update({
       embeds: [this.embed],
       content: `${this.author} | Continue andando pra minerar os minérios!`,
       components: [this.botoes]
      })
    }
  } else if (i.customId === "minerar_<"){

    mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    this.player.x = this.player.x - 1;
    if (this.player.x < 0) this.player.x = 9;

    if (this.player.x === this.carvao.x && this.player.y === this.carvao.y){

      this.collision(minerio.CARVAO, i, func);

    } else {

    mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

      mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)

      if (this.cobre.chance === true) {
     mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);

        if (this.player.x === this.cobre.x && this.player.y === this.cobre.y){

      this.collision(minerio.COBRE, this.message, func);

          return;

        }
      }

      if (this.ferro.chance === true) {
     mapa[this.ferro.y].a = mapa[this.ferro.y].a.replace(this.ferro.x, this.ferro.nome);



        if (this.player.x === this.ferro.x && this.player.y === this.ferro.y){

      this.collision(minerio.FERRO, i, func);

          return;
        }
      }

for (let d = 0; d< 10; d++){

    mapa[0].a = mapa[0].a.replace(d, this.fundo);
    mapa[1].a = mapa[1].a.replace(d, this.fundo);
    mapa[2].a = mapa[2].a.replace(d, this.fundo);
    mapa[3].a = mapa[3].a.replace(d, this.fundo);
    mapa[4].a = mapa[4].a.replace(d, this.fundo);

       continue;
      }
    
this.embed.description = `Carvões: ${this.carvao.total}\nCobres: ${this.cobre.total}\nFerro: ${this.ferro.total}\n\n${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji)

if (this.cobre.chance === true) {
     this.embed.description = this.embed.description.replace(this.cobre.nome, this.cobre.emoji)
}

      if (this.ferro.chance === true) {
     this.embed.description = this.embed.description.replace(this.ferro.nome, this.ferro.emoji)
      }

  
      
this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    i.update({
       embeds: [this.embed],
       content: `${this.author} | Continue andando pra minerar os minérios!`,
       components: [this.botoes]
      })
    }
  } else if (i.customId === "minerar_>") {

    mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    this.player.x = this.player.x + 1;
    if (this.player.x === 10) this.player.x = 0;

    if (this.player.x === this.carvao.x && this.player.y === this.carvao.y){

      this.collision(minerio.CARVAO, i, func);

    } else {

    mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

      mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)

      if (this.cobre.chance === true) {
     mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);

        if (this.player.x === this.cobre.x && this.player.y === this.cobre.y){

      this.collision(minerio.COBRE, this.message, func);

          return;

        }
      }

      if (this.ferro.chance === true) {
     mapa[this.ferro.y].a = mapa[this.ferro.y].a.replace(this.ferro.x, this.ferro.nome);



        if (this.player.x === this.ferro.x && this.player.y === this.ferro.y){

      this.collision(minerio.FERRO, i, func);

          return;
        }
      }

for (let e = 0; e < 10; e++){

    mapa[0].a = mapa[0].a.replace(e, this.fundo);
    mapa[1].a = mapa[1].a.replace(e, this.fundo);
    mapa[2].a = mapa[2].a.replace(e, this.fundo);
    mapa[3].a = mapa[3].a.replace(e, this.fundo);
    mapa[4].a = mapa[4].a.replace(e, this.fundo);

       continue;
      }
    
this.embed.description = `Carvões: ${this.carvao.total}\nCobres: ${this.cobre.total}\nFerro: ${this.ferro.total}\n\n${mapa[0].a}\n${mapa[1].a}\n${mapa[2].a}\n${mapa[3].a}\n${mapa[4].a}`.replace(this.player.name, this.personagem).replace(this.carvao.nome, this.carvao.emoji)

if (this.cobre.chance === true) {
     this.embed.description = this.embed.description.replace(this.cobre.nome, this.cobre.emoji)
}

      if (this.ferro.chance === true) {
     this.embed.description = this.embed.description.replace(this.ferro.nome, this.ferro.emoji)
      }
      
this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    i.update({
       embeds: [this.embed],
       content: `${this.author} | Continue andando pra minerar os minérios!`,
       components: [this.botoes]
      })
    }
  }
                   })
             }
}
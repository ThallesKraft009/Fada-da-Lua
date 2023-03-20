const events = require('events');
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } = require("discord.js");
const ms = require("ms");
const minerio = require("../Json/minerio.js");
const picaretas = require("../Json/picaretas.js");

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
    this.carvao.emoji = "🍮";
    this.carvao.nome = "(CARVAO)";
    this.carvao.x = Math.floor(Math.random() * 9);
    this.carvao.y = Math.floor(Math.random() * 4);
    
    this.cobre = {};
    this.cobre.total = 0;
    this.cobre.emoji = "🔶";
    this.cobre.nome = "(COBRE)";
    this.cobre.chance = Math.floor(Math.random() * 10);

      if (this.cobre.chance < 5) this.cobre.chance = true;
      if (this.cobre.chance > 5) this.cobre.chance = false;

    this.cobre.x = Math.floor(Math.random() * 9);
    this.cobre.y = Math.floor(Math.random() * 4);

    this.ferro = {};
    this.ferro.total = 0;

    this.personagem = personagem;

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
      
      if (type === minerio.CARVAO){
        
           let mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];


//this.carvao.x = Math.floor(Math.random() * 9);
//this.carvao.y = Math.floor(Math.random() * 4);


    console.log(`PLAYER.x: ${this.player.x} | PLAYER.y: ${this.player.y}\nCARVAO.x: ${this.carvao.x} | CARVAO.y: ${this.carvao.y}`)

     this.carvao.total = this.carvao.total + 1;
 
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
					.setCustomId('minerar_cmd')
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

      i.editReply({
          content: "Selecione a Picareta pra Minerar o carvão",
          embeds: [this.embed],
          components: [select, this.botoes]
      });
  }
}

  start(func){

    this.player.x = 0;
    this.player.y = 0;
    this.player.name = "(PLAYER)";
    this.location.x = 0;
    this.location.y = 0;

    this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    let mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

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
     this.embed.description = this.embed.description.replace(this.cobre.nome, this.cobre.emoji)
}

    this.message.reply({
      content: `${this.author} | Continue andando pra minerar os minérios!`,
      embeds: [this.embed],
      components: [this.botoes]
    });

   const collector = this.message.channel.createMessageComponentCollector({ time: ms("1h") });

collector.on('collect', async i => {

  if (i.customId === "minerar_baixo"){
 
       await i.deferUpdate();

    mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    this.player.y = this.player.y + 1;
    if (this.player.y === 5) this.player.y = 0;

    if (this.player.x === this.carvao.x && this.player.y === this.carvao.y){

      this.collision(minerio.CARVAO, i, func);

    } else {

mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

      mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)

      if (this.cobre.chance === true) {
     mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);
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

      
this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

   
      i.editReply({
          embeds: [this.embed],
          content: `${this.author} | Continue andando pra minerar os minérios!`,
          components: [this.botoes]
      });
    }
  } else if (i.customId === "minerar_cima") {
    await i.deferUpdate();

    mapa = [{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"},{a: "0123456789"}];

    this.player.y = this.player.y - 1;
    if (this.player.y < 0) this.player.y = 4;

    if (this.player.x === this.carvao.x && this.player.y === this.carvao.y){

      this.collision(minerio.CARVAO, i, func);

    } else {

mapa[this.player.y].a = mapa[this.player.y].a.replace(this.player.x, this.player.name);

      mapa[this.carvao.y].a = mapa[this.carvao.y].a.replace(this.carvao.x, this.carvao.nome)

      if (this.cobre.chance === true) {
     mapa[this.cobre.y].a = mapa[this.cobre.y].a.replace(this.cobre.x, this.cobre.nome);
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

this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    i.editReply({
       embeds: [this.embed],
       content: `${this.author} | Continue andando pra minerar os minérios!`,
       components: [this.botoes]
      })
    }
  } else if (i.customId === "minerar_<"){

    await i.deferUpdate();

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
      
this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    i.editReply({
       embeds: [this.embed],
       content: `${this.author} | Continue andando pra minerar os minérios!`,
       components: [this.botoes]
      })
    }
  } else if (i.customId === "minerar_>") {
    await i.deferUpdate();

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
      
this.embed.footer.text = `X: ${this.player.x}, Y: ${this.player.y}`;

    i.editReply({
       embeds: [this.embed],
       content: `${this.author} | Continue andando pra minerar os minérios!`,
       components: [this.botoes]
      })
    }
  }
});

  }
}
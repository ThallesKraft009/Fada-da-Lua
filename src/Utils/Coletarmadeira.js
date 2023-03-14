const { db } = require("../functions/getDB.js");
const { numberRandom } = require("../functions/numberRandom.js");
const events = require('events');
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ms = require("ms");

module.exports = class ColetarMadeira extends events {
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
    
      this.db = db(author);

  this.personagem = personagem;
    
   }

  on(func){

    let map = [
  {
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  }
]

    let MAPA_ = map;

    const player = `(PLAYER)`;
    const arvore = "🌲";
    let madeiras = 0;
    
    let madeira_1 = Math.floor(Math.random() * 9);
    
let madeira_1_i = Math.floor(Math.random() * 4);

let i = Math.floor(Math.random() * 4)

    let p = Math.floor(Math.random() * 9)

    map[i].a = map[i].a.replace(p, player)
    map[madeira_1_i].a = map[madeira_1_i].a.replace(madeira_1, arvore)

    const emoji_mapa = "⬛";
    let emoji_ceu = "🟦";

  for (let b = 0; b < 10; b++){

    console.log(b)

    map[0].a = map[0].a.replace(b, emoji_mapa)
    map[1].a = map[1].a.replace(b, emoji_mapa)
    map[2].a = map[2].a.replace(b, emoji_mapa)
    map[3].a = map[3].a.replace(b, emoji_mapa)
    map[4].a = map[4].a.replace(b, emoji_mapa)

     continue;
    
  }

    //Cima: ⬆️. Baixo:. ⬇️ < ⬅️  > ➡️

  let mapa = `${map[0].a}\n${map[1].a}\n${map[2].a}\n${map[3].a}\n${map[4].a}`.replace("(PLAYER)", this.personagem);
    
    const botoes = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setEmoji("⬅️")
        .setCustomId("madeira_<")
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setEmoji("⬆️")
        .setCustomId("madeira_cima")
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setEmoji("⬇️")
        .setCustomId("madeira_baixo")
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setEmoji("➡️")
        .setCustomId("madeira_>")
        .setStyle(ButtonStyle.Primary)
      );
    

    let embed = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}` })
      .setDescription(`Madeiras Coletadas: ${madeiras}\n\n${mapa}`)
    .setColor("Blue")
    .setTimestamp()
    .setFooter({ text: `Id do usuário: ${this.author.id}` })

    

    this.message.reply({
      embeds: [embed],
      components: [botoes]
    })

    const collector = this.message.channel.createMessageComponentCollector({ time: ms("1h") });

collector.on('collect', async interaction => {

  await interaction.deferUpdate();

  if (interaction.customId === "madeira_>"){

    p = p + 1;

       if (p === 10) p = 0;

     map = [
  {
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  }
];


    
  if (madeira_1 === p && madeira_1_i === i) {
    
      madeiras = madeiras + 1;

        func(madeiras)

    map[madeira_1_i].a = map[madeira_1_i].a.replace(p - 1, emoji_mapa)
      
      map[i].a = map[i].a.replace(madeira_1, player)
    
  madeira_1 = Math.floor(Math.random() * 9);
  madeira_1_i = Math.floor(Math.random() * 4);

       map[madeira_1_i].a = map[madeira_1_i].a.replace(madeira_1, arvore)
      
      

      for (let b = 0; b < 10; b++){

    map[0].a = map[0].a.replace(b, emoji_mapa)
    map[1].a = map[1].a.replace(b, emoji_mapa)
    map[2].a = map[2].a.replace(b, emoji_mapa)
    map[3].a = map[3].a.replace(b, emoji_mapa)
    map[4].a = map[4].a.replace(b, emoji_mapa)

     continue;
    
    }


     mapa = `${map[0].a}\n${map[1].a}\n${map[2].a}\n${map[3].a}\n${map[4].a}`.replace("(PLAYER)", this.personagem);

    let embed_4 = new EmbedBuilder()
      .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}` })
      .setDescription(`Madeiras Coletadas: ${madeiras}\n\n${mapa}`)
    .setColor("Blue")
    .setTimestamp()
    .setFooter({ text: `Id do usuário: ${this.author.id}` })

      interaction.editReply({
        embeds: [embed_4]
      })
  } else {

    
  map[madeira_1_i].a = map[madeira_1_i].a.replace(madeira_1, arvore)

    

    map[i].a = map[i].a.replace(player, emoji_mapa)

     map[i].a = map[i].a.replace(p, player)


     for (let b = 0; b < 10; b++){

    map[0].a = map[0].a.replace(b, emoji_mapa)
    map[1].a = map[1].a.replace(b, emoji_mapa)
    map[2].a = map[2].a.replace(b, emoji_mapa)
    map[3].a = map[3].a.replace(b, emoji_mapa)
    map[4].a = map[4].a.replace(b, emoji_mapa)

     continue;
    
     }

mapa = `${map[0].a}\n${map[1].a}\n${map[2].a}\n${map[3].a}\n${map[4].a}`.replace("(PLAYER)", this.personagem);

       let embed_4 = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}` })
      .setDescription(`Madeiras Coletadas: ${madeiras}\n\n${mapa}`)
    .setColor("Blue")
    .setTimestamp()
    .setFooter({ text: `Id do usuário: ${this.author.id}` })

      interaction.editReply({
        embeds: [embed_4]
      })
    }
  }
  

  if (interaction.customId === "madeira_baixo"){

    map = [
  {
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  }
];
    
      i = i + 1;

    let i_ = i - 1;
       if (i_ === -1) i_ = 4;

    if (i === 5) i = 0;

    if (madeira_1 === p && madeira_1_i === i) {
    
      madeiras = madeiras + 1;

        func(madeiras)

    map[madeira_1_i].a = map[madeira_1_i].a.replace(i_, emoji_mapa)
      
      map[i].a = map[i].a.replace(madeira_1, player)
    
  madeira_1 = Math.floor(Math.random() * 9);
  madeira_1_i = Math.floor(Math.random() * 4);

       map[madeira_1_i].a = map[madeira_1_i].a.replace(madeira_1, arvore)
      
      

      for (let b = 0; b < 10; b++){

    map[0].a = map[0].a.replace(b, emoji_mapa)
    map[1].a = map[1].a.replace(b, emoji_mapa)
    map[2].a = map[2].a.replace(b, emoji_mapa)
    map[3].a = map[3].a.replace(b, emoji_mapa)
    map[4].a = map[4].a.replace(b, emoji_mapa)

     continue;
    
    }


      mapa = `${map[0].a}\n${map[1].a}\n${map[2].a}\n${map[3].a}\n${map[4].a}`.replace("(PLAYER)", this.personagem);

    let embed_4 = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}` })
      .setDescription(`Madeiras Coletadas: ${madeiras}\n\n${mapa}`)
    .setColor("Blue")
    .setTimestamp()
    .setFooter({ text: `Id do usuário: ${this.author.id}` })

      interaction.editReply({
        embeds: [embed_4]
      })
  } else {
      

    map[madeira_1_i].a = map[madeira_1_i].a.replace(madeira_1, arvore)


    
    map[i_].a = map[i_].a.replace(player, emoji_mapa)


    map[i].a = map[i].a.replace(p, player)

for (let b = 0; b < 10; b++){

    map[0].a = map[0].a.replace(b, emoji_mapa)
    map[1].a = map[1].a.replace(b, emoji_mapa)
    map[2].a = map[2].a.replace(b, emoji_mapa)
    map[3].a = map[3].a.replace(b, emoji_mapa)
    map[4].a = map[4].a.replace(b, emoji_mapa)

     continue;
    
      }


mapa = `${map[0].a}\n${map[1].a}\n${map[2].a}\n${map[3].a}\n${map[4].a}`.replace("(PLAYER)", this.personagem);;

    let embed_3 = new EmbedBuilder()
.setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}` })
      .setDescription(`Madeiras Coletadas: ${madeiras}\n\n${mapa}`)
    .setColor("Blue")
    .setTimestamp()
    .setFooter({ text: `Id do usuário: ${this.author.id}` })

      interaction.editReply({
        embeds: [embed_3]
      })
    }
  }

  if (interaction.customId === "madeira_cima"){
    map = [
  {
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  }
];

    
       let i_ = i + 1;
      if (i === 0) i = 5;

        

    if (i_ === 5) i_ = 0;
    
      i = i - 1;

    if (madeira_1 === p && madeira_1_i === i) {
    
      madeiras = madeiras + 1;

        func(madeiras)

    map[madeira_1_i].a = map[madeira_1_i].a.replace(i_, emoji_mapa)
      
      map[i].a = map[i].a.replace(madeira_1, player)
    
  madeira_1 = Math.floor(Math.random() * 9);
  madeira_1_i = Math.floor(Math.random() * 4);

       map[madeira_1_i].a = map[madeira_1_i].a.replace(madeira_1, arvore)
      
      

      for (let b = 0; b < 10; b++){

    map[0].a = map[0].a.replace(b, emoji_mapa)
    map[1].a = map[1].a.replace(b, emoji_mapa)
    map[2].a = map[2].a.replace(b, emoji_mapa)
    map[3].a = map[3].a.replace(b, emoji_mapa)
    map[4].a = map[4].a.replace(b, emoji_mapa)

     continue;
    
    }


      mapa = `${map[0].a}\n${map[1].a}\n${map[2].a}\n${map[3].a}\n${map[4].a}`.replace("(PLAYER)", this.personagem);
      
    let embed_4 = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}` })
      .setDescription(`Madeiras Coletadas: ${madeiras}\n\n${mapa}`)
    .setColor("Blue")
    .setTimestamp()
    .setFooter({ text: `Id do usuário: ${this.author.id}` })

      interaction.editReply({
        embeds: [embed_4]
      })
  } else {

    map[i_].a = map[i_].a.replace(player, emoji_mapa)

    map[madeira_1_i].a = map[madeira_1_i].a.replace(madeira_1, arvore)



     map[i].a = map[i].a.replace(p, player)

for (let b = 0; b < 10; b++){

    map[0].a = map[0].a.replace(b, emoji_mapa)
    map[1].a = map[1].a.replace(b, emoji_mapa)
    map[2].a = map[2].a.replace(b, emoji_mapa)
    map[3].a = map[3].a.replace(b, emoji_mapa)
    map[4].a = map[4].a.replace(b, emoji_mapa)

     continue;
    
      }

mapa = `${map[0].a}\n${map[1].a}\n${map[2].a}\n${map[3].a}\n${map[4].a}`.replace("(PLAYER)", this.personagem);

    let embed_2 = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}` })
      .setDescription(`Madeiras Coletadas: ${madeiras}\n\n${mapa}`)
    .setColor("Blue")
    .setTimestamp()
    .setFooter({ text: `Id do usuário: ${this.author.id}` })

      interaction.editReply({
        embeds: [embed_2]
      })

    }
        
  }

   if (interaction.customId === "madeira_<"){

     p = p - 1;

       if (p < 0) p = 9;

     

     map = [
  {
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  },{
    a: "0123456789"
  }
];
    if (madeira_1 === p && madeira_1_i === i) {
    
      madeiras = madeiras + 1;

        func(madeiras)

    map[madeira_1_i].a = map[madeira_1_i].a.replace(p + 1, emoji_mapa)
      
      map[i].a = map[i].a.replace(madeira_1, player)
    
  madeira_1 = Math.floor(Math.random() * 9);
  madeira_1_i = Math.floor(Math.random() * 4);

       map[madeira_1_i].a = map[madeira_1_i].a.replace(madeira_1, arvore)
      
      

      for (let b = 0; b < 10; b++){

    map[0].a = map[0].a.replace(b, emoji_mapa)
    map[1].a = map[1].a.replace(b, emoji_mapa)
    map[2].a = map[2].a.replace(b, emoji_mapa)
    map[3].a = map[3].a.replace(b, emoji_mapa)
    map[4].a = map[4].a.replace(b, emoji_mapa)

     continue;
    
    }


      mapa = `${map[0].a}\n${map[1].a}\n${map[2].a}\n${map[3].a}\n${map[4].a}`.replace("(PLAYER)", this.personagem);

    let embed_4 = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}` })
      .setDescription(`Madeiras Coletadas: ${madeiras}\n\n${mapa}`)
    .setColor("Blue")
    .setTimestamp()
    .setFooter({ text: `Id do usuário: ${this.author.id}` })

      interaction.editReply({
        embeds: [embed_4]
      })
  } else {

     map[madeira_1_i].a = map[madeira_1_i].a.replace(madeira_1, arvore)

    
      map[i].a = map[i].a.replace(player, emoji_mapa)

     map[i].a = map[i].a.replace(p, player)
     

     for (let b = 0; b < 10; b++){

    map[0].a = map[0].a.replace(b, emoji_mapa)
    map[1].a = map[1].a.replace(b, emoji_mapa)
    map[2].a = map[2].a.replace(b, emoji_mapa)
    map[3].a = map[3].a.replace(b, emoji_mapa)
    map[4].a = map[4].a.replace(b, emoji_mapa)

     continue;
    
      }

mapa = `${map[0].a}\n${map[1].a}\n${map[2].a}\n${map[3].a}\n${map[4].a}`.replace("(PLAYER)", this.personagem);


       let embed_1 = new EmbedBuilder()
    .setAuthor({ name: `${this.author.tag}`, iconURL: `${this.author.displayAvatarURL()}` })
      .setDescription(`Madeiras Coletadas: ${madeiras}\n\n${mapa}`)
    .setColor("Blue")
    .setTimestamp()
    .setFooter({ text: `Id do usuário: ${this.author.id}` })

      interaction.editReply({
        embeds: [embed_1]
      })
        
     }
   }
  
});
    
  }
}
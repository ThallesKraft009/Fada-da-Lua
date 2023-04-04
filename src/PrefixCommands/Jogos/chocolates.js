const { EmbedBuilder } = require("discord.js");
const ms = require("ms")

module.exports = {
  name: "coletar-chocolate",
  run: async(client, message, args) => {

    let userdb = await client.userdb.findOne({
         userID: message.author.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: message.author.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: message.author.id })
      }
  

    if(Date.now() < userdb.pascoa.time){
      const calc = userdb.pascoa.time - Date.now()

      return message.reply({
        content: `Você só pode jogar novamente em: ${time(calc).hours}h ${time(calc).minutes}m ${time(calc).seconds}s !`
      })
     }  

    let player = {};
    let map = [
      {
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      }
    ];
 
    let i;
    let emojis = {};
    emojis.chocolate = "🍫"
    emojis.player = "🐇";

    let barreiras = [];

    

    for (let count = 0; count < 7; count++){

      let valores = {
        x: Math.floor(Math.random() * 7),
        y: Math.floor(Math.random() * 4)
      }

if (valores.x === 0 && valores.y === 0 || valores.x === 1 && valores.y === 0) valores = {
  x: valores.x + 1,
  y: 0
};

    barreiras.push(valores)
      continue;
    }

    let movimentos = 60;

    player.x = 0;
    player.y = 0;

    map[player.y].a = map[player.y].a.replace(
      `${player.x}`, `${emojis.player}`
    )

   barreiras.map(x => {

     map[x.y].a = map[x.y].a.replace(`${x.x}`, "🟥")
   })

    for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
    }
    /*
    chocolate_pontos = chocolate_pontos + 1;
    pontos = pontos + 1;
    */

    let mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

        let pontos = 0;
        let chocolate_pontos = 0;

    

    let msg = await message.reply({
      content: `Você só tem 1 minuto pra resgatar.`,
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
    /** /
    mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`${mapa}`)
        .setColor("Red")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
      ]
    })
    */

    //➡️   ⬅️    ⬆️   ⬇️

    msg.react("⬅️")
    msg.react("⬇️")
    msg.react("⬆️")
    msg.react("➡️")

    const collector = msg.createReactionCollector({ time: ms("1m") });

    
let chocolates_pegos = [];
let locais = [];

    
let parte_1 = [{
  x: 1,
  y: 0
},{
  x: 2,
  y: 0
},{
  x: 3,
  y: 0
},{
  x: 4,
  y: 0
},{
  x: 5,
  y: 0
},{
  x: 6,
  y: 0
},{
  x: 7,
  y: 0
}]
    parte_1.map(x => {
      locais.push(x)
    })

let parte_2 = [{
  x: 0,
  y: 1
},{
  x: 1,
  y: 1
},{
  x: 2,
  y: 1
},{
  x: 3,
  y: 1
},{
  x: 4,
  y: 1
},{
  x: 5,
  y: 1
},{
  x: 6,
  y: 1
},{
  x: 7,
  y: 1
}]
    parte_2.map(x => {
      locais.push(x)
    })

let parte_3 = [{
  x: 0,
  y: 2
},{
  x: 1,
  y: 2
},{
  x: 2,
  y: 2
},{
  x: 3,
  y: 2
},{
  x: 4,
  y: 2
},{
  x: 5,
  y: 2
},{
  x: 6,
  y: 2
},{
  x: 7,
  y: 2
}]
    parte_3.map(x => {
      locais.push(x)
    })

  let parte_4 = [{
  x: 0,
  y: 3
},{
  x: 1,
  y: 3
},{
  x: 2,
  y: 3
},{
  x: 3,
  y: 3
},{
  x: 4,
  y: 3
},{
  x: 5,
  y: 3
},{
  x: 6,
  y: 3
},{
  x: 7,
  y: 3
}]
    parte_4.map(x => {
      locais.push(x)
    })

let parte_5 = [{
  x: 0,
  y: 4
},{
  x: 1,
  y: 4
},{
  x: 2,
  y: 4
},{
  x: 3,
  y: 4
},{
  x: 4,
  y: 4
},{
  x: 5,
  y: 4
},{
  x: 6,
  y: 4
},{
  x: 7,
  y: 4
}]
    parte_5.map(x => {
      locais.push(x)
    })

      barreiras.map(x => {
        let index = locais.findIndex(n => n.x === x.x && n.y === x.y);

    if (index !== -1) locais.splice(index, 1);
        console.log(x.x, x.y)
      })

    console.log(locais);
collector.on('collect', async(reaction, user) => {

  if (user.id !== message.author.id) return;
  if (user.id === client.user.id) return;

  console.clear();
  await reaction.users.remove(user.id);

  movimentos = movimentos - 1;

//if (map[0].a === "⬛⬛⬛⬛⬛⬛⬛⬛⬛")

  console.log("LOCAIS: ", locais.length)

  let verificar = locais.length;

        map = [
      {
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      }
    ];

  if (verificar === 1) {

    map[player.y].a = map[player.y].a.replace(
      `${player.x}`, `${emojis.player}`
    )

    let a = {
      x: player.x + 1,
      y: player.y
    };

    chocolates_pegos.push(a)
    

    chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

    barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

    for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
          } mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
        .setTitle("Parabéns! você acabou")
      ]
    })

    collector.stop();
  }
  



  if (reaction.emoji.name === "⬅️"){
    
    player.x = player.x - 1;

    if (player.x === barreiras[0].x && player.y === barreiras[0].y || player.x === barreiras[1].x && player.y === barreiras[1].y || player.x === barreiras[2].x && player.y === barreiras[2].y || player.x === barreiras[3].x && player.y === barreiras[3].y || player.x === barreiras[4].x && player.y === barreiras[4].y || player.x === barreiras[5].x && player.y === barreiras[5].y || player.x === barreiras[6].x && player.y === barreiras[6].y){

map = [
      {
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      }
    ];

      map[player.y].a = map[player.y].a.replace(
      `${player.x + 1}`, `❌`
    );

      msg.reactions.removeAll()

      chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

      barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
      }

      mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
      collector.stop();
        return;
    }

    let index = locais.findIndex(n => n.x === player.x && n.y === player.y);

    if (index !== -1) {
      locais.splice(index, 1);
      chocolate_pontos = chocolate_pontos + 1;
      pontos = pontos + 5;
    }
    
    map = [
      {
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      }
    ];
    
    if (player.x < 0){
      map[player.y].a = map[player.y].a.replace(
      `${player.x + 1}`, `❌`
    );

      msg.reactions.removeAll()

      chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

      barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
   }

      mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
      collector.stop();
        return;
    }

    map[player.y].a = map[player.y].a.replace(
      `${player.x}`, `${emojis.player}`
    )

    let a = {
      x: player.x + 1,
      y: player.y
    };

    chocolates_pegos.push(a)
    

    chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

    barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

    for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
          } mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
    
  } else if (reaction.emoji.name === "➡️"){

    
    
    player.x = player.x + 1;

  if (player.x === barreiras[0].x && player.y === barreiras[0].y || player.x === barreiras[1].x && player.y === barreiras[1].y || player.x === barreiras[2].x && player.y === barreiras[2].y || player.x === barreiras[3].x && player.y === barreiras[3].y || player.x === barreiras[4].x && player.y === barreiras[4].y || player.x === barreiras[5].x && player.y === barreiras[5].y || player.x === barreiras[6].x && player.y === barreiras[6].y){

map = [
      {
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      }
    ];

      map[player.y].a = map[player.y].a.replace(
      `${player.x + 1}`, `❌`
    );

      msg.reactions.removeAll()

      chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

      barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

    for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
      }

      mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
      collector.stop();
        return;
  }

    let index = locais.findIndex(n => n.x === player.x && n.y === player.y);

    if (index !== -1) {
      locais.splice(index, 1);
      chocolate_pontos = chocolate_pontos + 1;
      pontos = pontos + 5;
    }

    
    if (player.x > 7){
      map[player.y].a = map[player.y].a.replace(
      `${player.x - 1}`, `❌`
    );

      msg.reactions.removeAll()

        chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

      barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
   }

      mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
      collector.stop();
        return;
    }

    map[player.y].a = map[player.y].a.replace(
      `${player.x}`, `${emojis.player}`
    )

    let a = {
      x: player.x - 1,
      y: player.y
    };

    chocolates_pegos.push(a)
    

    chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

    barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

        for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
   }

    mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
    
  } else if(reaction.emoji.name === "⬇️"){

    

   player.y = player.y + 1;

    if (player.x === barreiras[0].x && player.y === barreiras[0].y || player.x === barreiras[1].x && player.y === barreiras[1].y || player.x === barreiras[2].x && player.y === barreiras[2].y || player.x === barreiras[3].x && player.y === barreiras[3].y || player.x === barreiras[4].x && player.y === barreiras[4].y || player.x === barreiras[5].x && player.y === barreiras[5].y || player.x === barreiras[6].x && player.y === barreiras[6].y){

map = [
      {
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      }
    ];

      map[player.y].a = map[player.y].a.replace(
      `${player.x}`, `❌`
    );

      msg.reactions.removeAll()

      chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

      barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
      }

      mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
      collector.stop();
        return;
      }

    let index = locais.findIndex(n => n.x === player.x && n.y === player.y);

    if (index !== -1) {
      locais.splice(index, 1);
      chocolate_pontos = chocolate_pontos + 1;
      pontos = pontos + 5;
    }

  if (player.y > 4){

map[player.y - 1].a = map[player.y - 1].a.replace(
      `${player.x}`, `❌`
    );

      msg.reactions.removeAll()

        chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

    barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
   }

      mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
      collector.stop();
    
    return;
  }

    
    map[player.y].a = map[player.y].a.replace(
      `${player.x}`, `${emojis.player}`
    )

    let a = {
      x: player.x,
      y: player.y - 1
    };

    chocolates_pegos.push(a)
    

    chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

    barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

    for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
    }

        mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
    
  } else if (reaction.emoji.name === "⬆️"){
    
    player.y = player.y - 1;

    if (player.x === barreiras[0].x && player.y === barreiras[0].y || player.x === barreiras[1].x && player.y === barreiras[1].y || player.x === barreiras[2].x && player.y === barreiras[2].y || player.x === barreiras[3].x && player.y === barreiras[3].y || player.x === barreiras[4].x && player.y === barreiras[4].y || player.x === barreiras[5].x && player.y === barreiras[5].y || player.x === barreiras[6].x && player.y === barreiras[6].y){

map = [
      {
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      },{
        a: "01234567"
      }
    ];

      map[player.y].a = map[player.y].a.replace(
      `${player.x}`, `❌`
    );

      msg.reactions.removeAll()

      chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

      barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
      }

      mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
      collector.stop();
        return;
    }

    let index = locais.findIndex(n => n.x === player.x && n.y === player.y);

    if (index !== -1) {
      locais.splice(index, 1);
      chocolate_pontos = chocolate_pontos + 1;
      pontos = pontos + 5;
    }
    
    if (player.y < 0){

map[player.y + 1].a = map[player.y + 1].a.replace(
      `${player.x}`, `❌`
    );

      msg.reactions.removeAll()

        chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

      barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
      }

      mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
      collector.stop();
    
    return;
    }

    map[player.y].a = map[player.y].a.replace(
      `${player.x}`, `${emojis.player}`
    )

    let a = {
      x: player.x,
      y: player.y + 1
    };

    chocolates_pegos.push(a)
    

    chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

    barreiras.map(block => {
      map[block.y].a = map[block.y].a.replace(`${block.x}`, "🟥")
    })

    for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
      }

    mapa = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥\n🟥${map[0].a}🟥\n🟥${map[1].a}🟥\n🟥${map[2].a}🟥\n🟥${map[3].a}🟥\n🟥${map[4].a}🟥\n🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Chocolates: ${chocolate_pontos} | Pontos: ${pontos}\n\n${mapa}`)
        .setColor("Blue")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setTimestamp()
      ]
    })
  }

        
})

  collector.on("end", async() => {
    let author = message.author;

    msg.reply({
      content: `👑 | Seus pontos já foram resgatados ${author}!`
    });

    await client.userdb.updateOne({
         userID: author.id
     }, { $set: {
         "pascoa.pontos": userdb.pascoa.pontos + pontos,
      "pascoa.time": Date.now() + ms("20m")
     }
     })
    
  })
  }
}

  function time(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}
const { EmbedBuilder } = require("discord.js");
const ms = require("ms")

module.exports = {
  name: "coletar-chocolate",
  run: async(client, message, args) => {

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

    let movimentos = 60;

    player.x = 0;
    player.y = 0;

    map[player.y].a = map[player.y].a.replace(
      `${player.x}`, `${emojis.player}`
    )

    for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
    }

    let mapa = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛${map[0].a}⬛\n⬛${map[1].a}⬛\n⬛${map[2].a}⬛\n⬛${map[3].a}⬛\n⬛${map[4].a}⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`

    let msg = await message.reply({
      embeds: [
        new EmbedBuilder()
        .setDescription(`${mapa}`)
      ]
    })

    //➡️   ⬅️    ⬆️   ⬇️

    msg.react("⬅️")
    msg.react("⬇️")
    msg.react("⬆️")
    msg.react("➡️")

    const collector = msg.createReactionCollector({ time: ms("5m") });

    
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

    console.log(locais);
collector.on('collect', async(reaction, user) => {

  if (user.id !== message.author.id) return;
  if (user.id === client.user.id) return;

  console.clear();
  await reaction.users.remove(user.id);

  movimentos = movimentos - 1;

//if (map[0].a === "⬛⬛⬛⬛⬛⬛⬛⬛⬛")

  console.log("LOCAIS: ", locais.length)

  
  if (movimentos === 0) {

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

    
  msg.reactions.removeAll()

    
    chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
   }

      mapa = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛${map[0].a}⬛\n⬛${map[1].a}⬛\n⬛${map[2].a}⬛\n⬛${map[3].a}⬛\n⬛${map[4].a}⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`

      msg.edit({
        embeds: [
        new EmbedBuilder()
        .setDescription(`${mapa}`)
      ]
      })

    msg.reply({
      content: `❌ | ${user} seus movimentos acabaram!`
    })

    collector.stop();

    return;
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

  



  if (reaction.emoji.name === "⬅️"){

    if (locais.lenght === 0 || locais.length < 0){
    msg.channel.send({
      content: "Acabou :D"
    })

             console.clear()
    console.log("ARRAY VAZIA!")
    }

    player.x = player.x - 1;

    let index = locais.findIndex(n => n.x === player.x && n.y === player.y);

    if (index !== -1) locais.splice(index, 1);
    console.log(locais)
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

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
   }

      mapa = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛${map[0].a}⬛\n⬛${map[1].a}⬛\n⬛${map[2].a}⬛\n⬛${map[3].a}⬛\n⬛${map[4].a}⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`

      msg.edit({
        embeds: [
        new EmbedBuilder()
        .setDescription(`${mapa}`)
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
    console.log(chocolates_pegos)

    chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

    for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
          } mapa = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛${map[0].a}⬛\n⬛${map[1].a}⬛\n⬛${map[2].a}⬛\n⬛${map[3].a}⬛\n⬛${map[4].a}⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`

      msg.edit({
        embeds: [
        new EmbedBuilder()
        .setDescription(`${mapa}`)
      ]
      })
    
  } else if (reaction.emoji.name === "➡️"){

    if (locais.lenght === 0 || locais.length < 0){
    msg.channel.send({
      content: "Acabou :D"
    })

             console.clear()
    console.log("ARRAY VAZIA!")
    }
    
    player.x = player.x + 1;

    let index = locais.findIndex(n => n.x === player.x && n.y === player.y);

    if (index !== -1) locais.splice(index, 1);
    console.log(locais)

    
    if (player.x > 7){
      map[player.y].a = map[player.y].a.replace(
      `${player.x - 1}`, `❌`
    );

      msg.reactions.removeAll()

        chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
   }

      mapa = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛${map[0].a}⬛\n⬛${map[1].a}⬛\n⬛${map[2].a}⬛\n⬛${map[3].a}⬛\n⬛${map[4].a}⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`

      msg.edit({
        embeds: [
        new EmbedBuilder()
        .setDescription(`${mapa}`)
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
    console.log(chocolates_pegos)

    chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

        for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
   }

    mapa = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛${map[0].a}⬛\n⬛${map[1].a}⬛\n⬛${map[2].a}⬛\n⬛${map[3].a}⬛\n⬛${map[4].a}⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`

      msg.edit({
        embeds: [
        new EmbedBuilder()
        .setDescription(`${mapa}`)
      ]
      })
    
  } else if(reaction.emoji.name === "⬇️"){

    if (locais.lenght === 0 || locais.length < 0){
    msg.channel.send({
      content: "Acabou :D"
    })

             console.clear()
    console.log("ARRAY VAZIA!")
    }

   player.y = player.y + 1;

    let index = locais.findIndex(n => n.x === player.x && n.y === player.y);

    if (index !== -1) locais.splice(index, 1);
    console.log(locais)

  if (player.y > 4){

map[player.y - 1].a = map[player.y - 1].a.replace(
      `${player.y - 1}`, `❌`
    );

      msg.reactions.removeAll()

        chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
   }

      mapa = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛${map[0].a}⬛\n⬛${map[1].a}⬛\n⬛${map[2].a}⬛\n⬛${map[3].a}⬛\n⬛${map[4].a}⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`

    msg.edit({
        embeds: [
        new EmbedBuilder()
        .setDescription(`${mapa}`)
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
    console.log(chocolates_pegos)

    chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

    for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
    }

        mapa = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛${map[0].a}⬛\n⬛${map[1].a}⬛\n⬛${map[2].a}⬛\n⬛${map[3].a}⬛\n⬛${map[4].a}⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`

      msg.edit({
        embeds: [
        new EmbedBuilder()
        .setDescription(`${mapa}`)
      ]
      })
    
  } else if (reaction.emoji.name === "⬆️"){

if (locais.lenght === 0 || locais.length < 0){
    msg.channel.send({
      content: "Acabou :D"
    })

             console.clear()
    console.log("ARRAY VAZIA!")
}
    
    player.y = player.y - 1;

    let index = locais.findIndex(n => n.x === player.x && n.y === player.y);

    if (index !== -1) locais.splice(index, 1);
    console.log(locais)
    
    if (player.y < 0){

map[player.y + 1].a = map[player.y + 1].a.replace(
      `${player.y + 1}`, `❌`
    );

      msg.reactions.removeAll()

        chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

      for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
      }

      mapa = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛${map[0].a}⬛\n⬛${map[1].a}⬛\n⬛${map[2].a}⬛\n⬛${map[3].a}⬛\n⬛${map[4].a}⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`

    msg.edit({
        embeds: [
        new EmbedBuilder()
        .setDescription(`${mapa}`)
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
    console.log(chocolates_pegos)

    chocolates_pegos.map(x => {

 map[x.y].a = map[x.y].a.replace(`${x.x}`, "⬛")
      
    })

    for (i = 0; i < 10; i++){
      map[0].a = map[0].a.replace(`${i}`, `${emojis.chocolate}`);

      map[1].a = map[1].a.replace(`${i}`, `${emojis.chocolate}`);

      map[2].a = map[2].a.replace(`${i}`, `${emojis.chocolate}`);

      map[3].a = map[3].a.replace(`${i}`, `${emojis.chocolate}`);

      map[4].a = map[4].a.replace(`${i}`, `${emojis.chocolate}`);

      continue;
        
      }

    mapa = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛${map[0].a}⬛\n⬛${map[1].a}⬛\n⬛${map[2].a}⬛\n⬛${map[3].a}⬛\n⬛${map[4].a}⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`

      msg.edit({
        embeds: [
        new EmbedBuilder()
        .setDescription(`${mapa}`)
      ]
      })
  }

        
})
    
  }
}
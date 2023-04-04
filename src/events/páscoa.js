const client = require("../bot.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const ms = require("ms");
const { Events, EmbedBuilder } = require("discord.js");
const users = [];
/*

let Channel_log = client.channels.cache.get("1092561724227461160")

    Channel_log.send({
      
    })

*/

client.on(Events.MessageReactionAdd, async(reaction, user) => {

  if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
  };

  let id = reaction.message.id;

  if (user.id === client.user.id) return;

  let msgdb = await client.pascoa_db.findOne({
         id: id
     })
      
     if(!msgdb){
         const newumsg = new client.pascoa_db({
         id: id
     })
         await newumsg.save();
         
         msgdb = await client.pascoa_db.findOne({
         id: id
     })
     }

  //console.log(reaction.emoji)

  let userdb = await client.userdb.findOne({
         userID: user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: user.id })
     }

           /*
           pascoa: {
    ovo_azul: { type: Number, default: 0 },
    ovo_vermelho: { type: Number, default: 0 },
    ovo_verde: { type: Number, default: 0 },
    ovo_dourado: { type: Number, default: 0 },
    pontos: { type: Number, default: 0 }
  },
           */

  let hm = users[user.id];


  if (reaction.emoji.name === "ovo_pascoa_2") {
 
  if (msgdb.verificacao === false) return;

        if (!hm) {

let member = client.users.cache.get(`${user.id}`);

    if (user.bot) return;

let Channel_log = client.channels.cache.get("1092561724227461160")

    Channel_log.send({
      content: `${user.tag} tentou resgatar um ovo`
    })

    member.send({
      content: `:x: | Opa! Você está sem mandar uma mensagem há mais de 5 minutos, com isso você não resgatou o ovo de páscoa.`
    })

    return console.log(user.tag, " tentou pegar um ovo!")
        }
    
    let a = await db.get(`ovo_${id}_${user.id}`);
    if (a === true) return;

    await db.set(`ovo_${id}_${user.id}`, true)

  console.log(user.tag, " Ganhou um ovo dourado!")

    let Channel_log = client.channels.cache.get("1092561724227461160")

    Channel_log.send({
      content: `${user.tag} resgatou um ovo`
    })
   

  await client.userdb.updateOne({
         userID: user.id
     }, { $set: {
         "pascoa.ovo_dourado": userdb.pascoa.ovo_dourado + 1,
"pascoa.pontos": userdb.pascoa.pontos + 4
     }
     })
    
} else 
    if (reaction.emoji.name === "ovo_pascoa_3"){

      if (msgdb.verificacao === false) return;

        if (!hm) {

let member = client.users.cache.get(`${user.id}`);

    if (user.bot) return;

let Channel_log = client.channels.cache.get("1092561724227461160")

    Channel_log.send({
      content: `${user.tag} tentou resgatar um ovo`
    })

    member.send({
      content: `:x: | Opa! Você está sem mandar uma mensagem há mais de 5 minutos, com isso você não resgatou o ovo de páscoa.`
    })

    return console.log(user.tag, " tentou pegar um ovo!")
        }

      let a = await db.get(`ovo_${id}_${user.id}`);
    if (a === true) return;

    await db.set(`ovo_${id}_${user.id}`, true)

  console.log(user.tag, " Ganhou um ovo verde!")

      let Channel_log = client.channels.cache.get("1092561724227461160")

    Channel_log.send({
      content: `${user.tag} resgatou um ovo`
    })

      await client.userdb.updateOne({
         userID: user.id
     }, { $set: {
         "pascoa.ovo_verde": userdb.pascoa.ovo_verde + 1,
        "pascoa.pontos": userdb.pascoa.pontos + 2
     }
     })
} else 
      if (reaction.emoji.name === "ovo_pascoa_1"){

        if (msgdb.verificacao === false) return;

          if (!hm) {

let member = client.users.cache.get(`${user.id}`);

    if (user.bot) return;

let Channel_log = client.channels.cache.get("1092561724227461160")

    Channel_log.send({
      content: `${user.tag} tentou resgatar um ovo`
    })

    member.send({
      content: `:x: | Opa! Você está sem mandar uma mensagem há mais de 5 minutos, com isso você não resgatou o ovo de páscoa.`
    })

    return console.log(user.tag, " tentou pegar um ovo!")
          }

        let a = await db.get(`ovo_${id}_${user.id}`);
    if (a === true) return;

    await db.set(`ovo_${id}_${user.id}`, true)
    
console.log(user.tag, " Ganhou um ovo azul!")

        await client.userdb.updateOne({
         userID: user.id
     }, { $set: {
         "pascoa.ovo_azul": userdb.pascoa.ovo_azul + 1,
          "pascoa.pontos": userdb.pascoa.pontos + 1
     }
     })
} else 
      if (reaction.emoji.name === "ovo_pascoa_4"){

        if (msgdb.verificacao === false) return;

                    if (!hm) {

let member = client.users.cache.get(`${user.id}`);

    if (user.bot) return;

let Channel_log = client.channels.cache.get("1092561724227461160")

    Channel_log.send({
      content: `${user.tag} tentou resgatar um ovo`
    })

    member.send({
      content: `:x: | Opa! Você está sem mandar uma mensagem há mais de 5 minutos, com isso você não resgatou o ovo de páscoa.`
    })

    return console.log(user.tag, " tentou pegar um ovo!")
  }

        let a = await db.get(`ovo_${id}_${user.id}`);
    if (a === true) return;

    await db.set(`ovo_${id}_${user.id}`, true)
          
        console.log("vermelho")
console.log(user.tag, " Ganhou um ovo vermelho!")

      let Channel_log = client.channels.cache.get("1092561724227461160")

    Channel_log.send({
      content: `${user.tag} resgatou um ovo`
    })

        await client.userdb.updateOne({
         userID: user.id
     }, { $set: {
         "pascoa.ovo_vermelho": userdb.pascoa.ovo_vermelho + 1,
          "pascoa.pontos": userdb.pascoa.pontos + 3 
     }
     })
}
  
})

let i = 0;
const min = 15;
const max = 50;
let number_random;
const timerDuration = ms("50s");
const tempo = {};

number_random = Math.floor(Math.random() * (max - min + 1)) + min;


client.on("messageCreate", async(message) => {

  if(message.author.bot) return;
	if(message.channel.type !== 0) return;

 //let g = await db.get("verificar_evento");
//if (!g || g === null || g === false) return;
 // console.log("Mensagem recebida.")

  //client.pascoa_db
  const { author, id } = message;

  users[author.id] = {};
  users[author.id] = setTimeout(() => {

    users[author.id] = undefined;
    console.log("End: ", author.tag)
    
  }, ms("5m"))
    
    i = i + 1;

  

let emoji;
  if (number_random < 50) emoji = "<:ovo_pascoa_2:1087078981020438640>";
  if (number_random < 40) emoji = "<:ovo_pascoa_4:1087079100407107715>"; //dourado
  if (number_random < 30) emoji = "<:ovo_pascoa_3:1087078854151114752>";
  if (number_random < 20) emoji = "<:ovo_pascoa_1:1087078709699301518>"; // azul


  users[author.id] = setTimeout(() => {

    users[author.id] = undefined;
    
  }, ms("5m"))

  if (i === number_random) {

    let msgdb = await client.pascoa_db.findOne({
         id: id
     })
      
     if(!msgdb){
         const newumsg = new client.pascoa_db({
         id: id
     })
         await newumsg.save();
         
         msgdb = await client.pascoa_db.findOne({
         id: id
     })
    }


    message.react(`${emoji}`);

    await client.pascoa_db.updateOne({
         id: id
     }, { $set: {
         "verificacao": true
     }
     })

    i = 0;

    
    number_random = Math.floor(Math.random() * (max - min + 1)) + min;
    
  }

    clearTimeout(tempo.a);

  tempo.a = setTimeout(() => {
      i = 0;

    number_random = Math.floor(Math.random() * (max - min + 1)) + min;

    }, timerDuration)
})
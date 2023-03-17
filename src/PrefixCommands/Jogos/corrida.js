const Corrida = require("./../../Utils/Corrida");

module.exports = {
  name: "corrida",

  run: async(client, message, args) => {

    let { author } = message;

    let player_2 = message.mentions.members.first() || client.users.cache.get(args[0]);

    if (!player_2) return message.reply({
      content: "Mencione um membro pra correr"
    })

    if (player_2.id === author.id) {
      message.reply({
      content: "Você não pode correr com você mesmo!"
    })
    } else {

    let mundodb = await client.mundodb.findOne({
         userID: author.id
     })
      
     if(!mundodb){
         const newworld = new client.mundodb({ userID: author.id })
         await newworld.save();
         
         mundodb = await client.mundodb.findOne({ userID: author.id })
     };


    let mundodb_2 = await client.mundodb.findOne({
         userID: player_2.id
     })
      
     if(!mundodb_2){
         const newworld = new client.mundodb({ userID: player_2.id })
         await newworld.save();
         
         mundodb_2 = await client.mundodb.findOne({ userID: player_2.id })
     };

  if (mundodb.personagem === mundodb_2.personagem) mundodb_2.personagem = "<:arell:1085300795483902113>";

    
const a = new Corrida(client, message, false, mundodb.personagem, mundodb_2.personagem);

  a.run(player_2.id, async(user, feijoes) => {

    let ganhador = client.users.cache.get(user);

   let userdb = await client.userdb.findOne({
         userID: ganhador.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: ganhador.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: ganhador.id })
     }

    /*
moedas: {
    feijao: { type: Number, default: 0 },
    moeda: { type: Number, default: 0 }
  },
*/


await client.userdb.updateOne({
         userID: ganhador.id
     }, { $set: {
         "moedas.feijao": userdb.moedas.feijao + feijoes
     }
     })
    
  });

    }
  }
}
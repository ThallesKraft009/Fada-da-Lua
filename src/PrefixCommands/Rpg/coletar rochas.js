const Rpg = require("../../Utils/Rpg.js");

module.exports = {
  name: "coletar-rochas",

  run: async(client, message, args) => {

    let { author } = message;

    let mundodb = await client.mundodb.findOne({
         userID: author.id
     })
      
     if(!mundodb){
         const newworld = new client.mundodb({ userID: author.id })
         await newworld.save();
         
         mundodb = await client.mundodb.findOne({ userID: author.id })
     };

      if (mundodb.mundo.nome === null) return message.reply({
        content: "Você ainda não criou seu mundo, utilize o comando **\`mw!criar-mundo\`**!"
      })


const Game = new Rpg(client, message, false, mundodb.personagem);

     Game.coletarRochas(async(i) => {

       mundodb.blocos.pedra = mundodb.blocos.pedra + 1;

await client.mundodb.updateOne({
         userID: author.id
     }, { $set: {
         "blocos.pedra": mundodb.blocos.pedra
     }
     })
       
    });
    
  }
}
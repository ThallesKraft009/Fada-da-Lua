const ColetarMadeira = require("../../Utils/Coletarmadeira.js");

module.exports = {
  name: "coletar-madeira",

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

    const Game = new ColetarMadeira(client, message, false);

     Game.on(async(madeiras) => {

await client.mundodb.updateOne({
         userID: author.id
     }, { $set: {
         "blocos.madeira": mundodb.blocos.madeira + 1
     }
     })
       
    });

    
  }
}
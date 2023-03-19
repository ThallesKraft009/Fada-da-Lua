const Rpg = require("../../Utils/Rpg.js");

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

    const Game = new Rpg(client, message, false, mundodb.personagem);

     Game.coletarMadeira(async(madeiras) => {

       mundodb.blocos.madeira = mundodb.blocos.madeira + 1;

           console.log("ganhou mais uma madeira! ", mundodb.blocos.madeira)

       await client.mundodb.updateOne({
         userID: author.id
     }, { $set: {
         "blocos.madeira": mundodb.blocos.madeira
     }
     })

    });

    
  }
}
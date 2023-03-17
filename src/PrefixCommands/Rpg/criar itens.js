const Rpg = require("../../Utils/Rpg.js");

module.exports = {
  name: "criar-itens",

  run: async (client, message, args) => {

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

    Game.criarItens(mundodb, async(item, quantidade) => {
      console.log(item);
    })

  }
}
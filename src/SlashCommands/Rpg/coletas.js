const ColetarMadeira = require("../../Utils/Coletarmadeira.js");

module.exports = {
  name: "coletar",
  description: "Colete items ou blocos no rpg",
  type: 1,

  options: [
    {
      name: "madeira",
      description: "Colete madeiras no seu mundo",
      type: 1
    }
  ],

  run: async(client, interaction) => {
    
    let { user } = interaction;

    let mundodb = await client.mundodb.findOne({
         userID: user.id
     })
      
     if(!mundodb){
         const newworld = new client.mundodb({ userID: user.id })
         await newworld.save();
         
         mundodb = await client.mundodb.findOne({ userID: user.id })
     };
    
let cmd = interaction.options.getSubcommand();

    /*=========== MADEIRA =========*/

    if (cmd === "madeira"){

    
      if (mundodb.mundo.nome === null) return interaction.reply({
        content: "Você ainda não criou seu mundo, utilize o comando **\`/criar mundo\`**!",
        ephemeral: true
      })

    const Game = new ColetarMadeira(client, interaction, true, mundodb.personagem);

     Game.on(async(madeiras) => {

await client.mundodb.updateOne({
         userID: user.id
     }, { $set: {
         "blocos.madeira": mundodb.blocos.madeira + 1
     }
     })
       
    });
    }
    
  }
}
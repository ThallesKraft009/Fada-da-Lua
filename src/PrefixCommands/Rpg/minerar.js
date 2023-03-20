const Minerar = require("../../Utils/Minerar.js");
const minerios = require("../../Json/minerio.js");
const picaretas = require("../../Json/picaretas.js");

module.exports = {
  name: "minerar",

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

    const Mineracao = new Minerar(client, message, false, mundodb.personagem);

           console.clear()

    Mineracao.start(async(minerio) => {
      if (minerio === minerios.CARVAO){
        
      } else if (minerio === minerios.COBRE){
        
      } else if (minerio === minerios.FERRO){
        
      }
    })
  }
}
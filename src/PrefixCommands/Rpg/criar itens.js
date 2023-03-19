const Rpg = require("../../Utils/Rpg.js");

module.exports = {
  name: "criar-itens",
  aliases: ["criar-item"],

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
    
let item = args[0];

    if (!item) {

      return message.reply({
        content: `Você precisa falar qual item quer criar, exemplo: **\`mw!criar-item graveto 10\`**`
      })
    
    } else if (item === "graveto" || item === "gravetos") {

      let madeiras = mundodb.blocos.madeira;

       let quantidade = args[1];
      quantidade = Number(`${quantidade}`);
      
          if (!quantidade) return message.reply({
            content: `Especifique a quantidade, exemplo: **\`mw!criar-item [item] [quantidade]\`**`
          });

      if (quantidade > madeiras) return message.reply({
        content: `Você precisa ter mais ${quantidade - madeiras} madeiras pra criar ${quantidade} gravetos`
      });


await client.mundodb.updateOne({
         userID: author.id
     }, { $set: {
         "blocos.madeira": mundodb.blocos.madeira - quantidade,
          "item.gravetos": mundodb.item.gravetos + quantidade
     }
     })


      message.reply({
        content: `Você criou ${quantidade} gravetos!`
      })
      
   } else {
      return message.reply({
        content: `Esse item não existe.`
      })
   } 

  }
}
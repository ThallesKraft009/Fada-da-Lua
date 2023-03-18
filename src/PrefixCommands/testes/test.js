const ver = true;
const Fornalha = require("../../Utils/Fornalha");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "pergunta",

  run: async(client, message, args) => {

let embed_rpg = new EmbedBuilder()
    .setTitle("Como jogar no Rpg")
    .setDescription("O rpg é uma recriação de um suvival do MiniWorld.\nOs comandos do rpg estão disponíveis em slashCommands e PrefixCommands")
    .setColor("Blue")

let uid = new EmbedBuilder()
    .setTitle("Como funciona os UIDs na Fada?")
    .setDescription("Os uids salvos são utilizados como meio de informação sobre o membro aqui no discord.\nCaso algum novo membro queira queree saber seu uid, ele pode utilizar um comando pra buscar o uid do membro e vendo o uid se ele salvou ou não.")
    .setColor("Blue")

    
let data = { dados: [{
  pergunta: "como jogar no rpg",
  resposta: embed_rpg
},{
  pergunta: "como usar o rpg",
  resposta: embed_rpg
},{
  pergunta: "tutorial do rpg",
  resposta: embed_rpg
},{
  pergunta: "quero aprender a jogar rpg",
  resposta: embed_rpg
},{
  pergunta: "como funciona o rpg",
  resposta: embed_rpg
},{
  pergunta: "como jogar o rpg",
  resposta: embed_rpg
},{
  pergunta: "como salvar o uid",
  resposta: uid
},{
pergunta: "como buscar um uid",
  resposta: uid
},{
pergunta: "uid",
  resposta: uid
},{
pergunta: "buscar uid",
  resposta: uid
},{
pergunta: "salvar o uid",
  resposta: uid
}]};


const jsonString = JSON.stringify(data, null, 2);

fs.writeFile('src/Json/pergunta.json', jsonString, err => {
  if (err) {
    console.error(err);
    return;
  }
})



   /* if (ver !== true) return;


    const a = new Fornalha(client);

    let embed = new EmbedBuilder()
    .setColor("Blue")

    const msg = await message.reply({
      content: "."
    })

  a.on(async(map, verificar) => {

       embed = embed.setDescription(`${map}`)

    await msg.edit({
      embeds: [embed]
    })
  })
    */
  }
}
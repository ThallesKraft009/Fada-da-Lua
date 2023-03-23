const client = require("../bot.js");
const { perguntas } = require("../Json/Perguntas/perguntas.js");
const similarity = require('string-similarity');
console.clear()
console.log(perguntas)



client.on('messageCreate', async (message) => {
   // if(message.author.bot) return;
	 // if(message.channel.type !== 0) return;

  if(message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`) || message.content === `<@!${client.user.id}>` || message.content === `<@!${client.user.id}>`) {

    let perguntaUsuario = message.content;
    perguntaUsuario = perguntaUsuario.replace(`<@${client.user.id}>`, "").replace(`<@!${client.user.id}>`, "").toLowerCase()

   perguntaUsuario = perguntaUsuario || "mention";

    console.log(perguntaUsuario)
    
    const perguntasSimilares = perguntas.filter((pergunta) => {
      
  const matches = similarity.findBestMatch(perguntaUsuario, [pergunta.pergunta]);
      
  const bestMatch = matches.bestMatch;
  return bestMatch.rating > 0.3;
});

console.log(perguntasSimilares);
    
if (perguntasSimilares.length > 0) {

  let resposta = `${perguntasSimilares[0].resposta}`.replace("(author)", message.author).replace("(membros)", message.guild.members.cache.size);
  
message.reply({
  content: `${resposta}`
})

} else {

  message.reply({
    content: `Desculpa, não entendi sua pergunta :/`
  })
}
  }
})
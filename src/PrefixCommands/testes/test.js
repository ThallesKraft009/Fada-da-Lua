const perguntas = require("../../Json/pergunta.json");

const similarity = require('string-similarity');

const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "test",
  run: async(client, message, args) => {


    let perguntaUsuario = args.join(" ");

    const perguntasSimilares = perguntas.filter((pergunta) => {
      
  const matches = similarity.findBestMatch(perguntaUsuario, [pergunta.pergunta]);
      
  const bestMatch = matches.bestMatch;
  return bestMatch.rating > 0.3;
});

if (perguntasSimilares.length > 0) {

  let resposta = `${perguntasSimilares[0].resposta}`.replace("(author)", message.author)
  
message.reply({
  content: `${resposta}`
})

} else {

  message.reply({
    content: `Desculpa, não entendi sua pergunta :/`
  })
  
}
    
  }
}
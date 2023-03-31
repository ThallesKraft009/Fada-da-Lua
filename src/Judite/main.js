const natural = require('natural');
const client = require("../bot.js");
const moment = require('moment-timezone');

moment.tz.setDefault('America/Sao_Paulo')

const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();

//Dados de treinamento 
// Cumprimentos com uma possível resposta
classifier.addDocument('oi', 'Oi, tudo bem?');
classifier.addDocument('olá', 'Olá, como vai?');
classifier.addDocument('e aí', 'E aí, tudo bem?');
classifier.addDocument('tudo bem', 'Tudo ótimo, obrigado. E você?');
classifier.addDocument("td e vc?", "Também estou bem")
classifier.addDocument("tudo e você", "Também estou bem")
classifier.addDocument('bom dia', 'Bom dia, como posso ajudar?');
classifier.addDocument('boa tarde', 'Boa tarde, posso ajudar em algo?');
classifier.addDocument('boa noite', 'Boa noite, como posso ajudar?');
classifier.addDocument("estou bem e você", "também estou bem")
classifier.addDocument("estou bem e vc", "Tô bem tbm")

classifier.addDocument("ss e vc", "Também estou bem")
//Sobre oz Horários

classifier.addDocument("Que horas são?", `Agora é (hora_atual) no horário de Brasília.`)
  
classifier.addDocument("Qual é o horário atual?", `Agora é (hora_atual) no horário de Brasília.`)

classifier.addDocument("estamos em que ano?", `Estamos no ano de ${moment().format('YYYY')}!`)

classifier.addDocument("Você já dormiu alguma vez?", "Sim, quando meu desenvolvedor esquece de me hospedar 😁")

//Outras Perguntas
classifier.addDocument("O que você acha de", "Eu acho que ele(a) é uma pessoa muito legal 😁")


classifier.addDocument("Escolha de sim e não", `(sim/nao)`)

classifier.addDocument("Qual sua cor favorita?", "Eu amo muito a cor azul")

classifier.addDocument("Quem sou eu?", "Você é uma pessoa legal que gosta de conversar aqui ;)")

classifier.addDocument('Quem é <@>?', 'Infelizmente não sei nada sobre ele(a)');

classifier.addDocument("Quem é você?", "Eu sou apenas uma simples robô do servidor ;)")

classifier.addDocument("Como posso ver minhas estrelinhas?", "Você pode ver suas estrelinhas ou de outro membro usando o comando **mw!estrelinhas**")

classifier.addDocument("Você gosta de pudim?", "Sim, eu amo pudim 🍮")

classifier.addDocument("Que dia é hoje?", "Infelizmente eu não sei qual o dia de hoje :/")

classifier.addDocument("Como posso ver meu uid?", "Você pode ver seu uid ou dd outro membro utilizando **mw!buscar-uid**")

classifier.addDocument("Você pode me ajudar?", "Você pode pedir ajuda em <#751536512453181562> ;)")

classifier.addDocument("Quais são seus comandos?", "Você pode ver minha lista de comandos utilizando **mw!ajuda** 😁")

classifier.addDocument("Quem é seu criador?", "Meu criador é <@882913524291088384>")

  classifier.addDocument("Quem é fez você?", "<@882913524291088384> me fez há mais de 1 ano ;)")

classifier.addDocument("Estou bem", "Que bom que você está bem")

classifier.addDocument("Você pode jogar comigo?", "Desculpa, sou apenas um robô e não fui feita pra jogar jogos.")

classifier.addDocument("Reage a minha mensagem", "Não posso reagir a sua mensagem com um ovo de páscoa agora ;)")


classifier.addDocument("Qual é seu ping atual?", "Meu ping atual é (getPing)ms!")
/** 
classifier.addDocument("", "")
classifier.addDocument("", "")
classifier.addDocument("", "")
**/

//Treinando
classifier.train();




const Judite = async(pergunta, message) => {

  let chat = client.channels.cache.get("1089543431812034570");
  const tokens = tokenizer.tokenize(pergunta);
  let resposta = classifier.classify(pergunta)


  chat.send({
    content: `\`\`\`js\n"Executando a Judite..."\n\`\`\`\nTOKENS: **\`${tokens}\`**\nResposta: **\`${resposta}\`**`
  })

const respostas = ['Sim', 'Não'];
resposta = resposta.replace("(sim/nao)", `${respostas[Math.floor(Math.random() * respostas.length)]}`).replace("(hora_atual)", `${moment().format('HH:mm:ss')}`).replace("(getPing)", client.ws.ping)

     message.reply({
       content: `${resposta}`
     });

}

module.exports = { Judite };
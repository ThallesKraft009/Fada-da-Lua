const natural = require('natural');

const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();

//Dados do ensinamento
classifier.addDocument('Oi', 'Olá, como posso lhe ajudar?');

classifier.addDocument("Você já dormiu alguma vez?", "Sim, quando meu desenvolvedor esquece de me hospedar 😁")

classifier.addDocument("Quem é você?", "Eu sou apenas uma simples robô do servidor ;)")

classifier.addDocument("Como posso ver minhas estrelinhas?", "Você pode ver suas estrelinhas ou de outro membro usando o comando **mw!estrelinhas**")

//Treinando
classifier.train();


const Judite = async(pergunta, message) => {

  const tokens = tokenizer.tokenize(pergunta);
  const resposta = classifier.classify(pergunta);

     message.reply({
       content: `${resposta}`
     });

}

module.exports = { Judite };
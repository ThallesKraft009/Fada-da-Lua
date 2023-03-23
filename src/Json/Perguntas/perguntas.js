const perguntas = [];

const inicial = require("./inicial.json");
inicial.map(x => {
  let a = {
    pergunta: x.pergunta,
    resposta: x.resposta
  };

   perguntas.push(a);
})

const extras = require("./extras.json");
extras.map(x => {
  let b = {
    pergunta: x.pergunta,
    resposta: x.resposta
  };

   perguntas.push(b);
})


const star = require("./estrelinhas.json");
star.map(x => {
  let c = {
    pergunta: x.pergunta,
    resposta: x.resposta
  };

   perguntas.push(c);
})

console.log(perguntas);


module.exports = { perguntas };
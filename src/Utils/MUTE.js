const dados = [];
const client = require("../bot.js");

console.log(dados);

const { EmbedBuilder } = require("discord.js");

const TIMEOUT = async(msg, membro, isSlash, tempo) => {
  
    let author;
    if (isSlash === false) author = msg.author;
    if (isSlash === true) author = msg.user;

let time = dados[membro.id];

  const mural = client.channels.cache.get(
        `${client.chat.mural}`
      );

  if (!time){

    dados[membro.id] = setTimeout(() => {

//========= Quando o timeout acabar
let embed = new EmbedBuilder()
  .setTittle("Parece que alguém está pronto para falar👀")
      
      mural.send({
        content: `${membro}`,
        embeds: [embed]
      })
      
     }, tempo)

console.log(dados);
  } else {
//============ Se alguem remover o timeout
     let embed_2 = new EmbedBuilder()
    .setDescription(`${msg.author.tag} removeu o timeout de ${membro.tag}!`)

  mural.send({
    embeds: [embed_2]
  })

    clearTimeout(time);

    dados[membro.id] = undefined;

    console.log(dados);
    
  }
}



module.exports = { TIMEOUT };
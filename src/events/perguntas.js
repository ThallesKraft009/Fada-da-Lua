const client = require("../bot.js");
const { Judite } = require("../Judite/main.js");


client.on('messageCreate', async (message) => {
   if(message.author.bot) return;
	 if(message.channel.type !== 0) return;

  if(message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`) || message.content === `<@!${client.user.id}>` || message.content === `<@!${client.user.id}>`) {

  let pergunta = message.content;
   pergunta = pergunta.replace(`<@!${client.user.id}>`, "").replace(`<@${client.user.id}`, "");

    Judite(pergunta, message);
    
  }
})
const client = require("../bot.js");
const { Judite } = require("../Judite/main.js");


client.on('messageCreate', async (message) => {
   if(message.author.bot) return;
	 if(message.channel.type !== 0) return;

/*if (message.reference){

  message.channel.messages.fetch({ message: `${message.reference.messageId}`, cache: false, force: true }).then(async(msg) => {


  if (msg.author.id === client.user.id){

 let pergunta = message.content;


   Judite(pergunta, message);
}
  })
} else */
  message.content = message.content.toLowerCase();
  
  if(message.content.startsWith("fada") || message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`) || message.content === `<@!${client.user.id}>` || message.content === `<@!${client.user.id}>`) {

  let pergunta = message.content;
  
    
   pergunta = pergunta.replace(`<@!${client.user.id}>`, "").replace(`<@${client.user.id}`, "").replace("fada", "")
    
    pergunta = pergunta || "oi";

    Judite(pergunta, message);
    
  }
})
const client = require("../bot.js");

let prefix = "mw!";

client.on('messageCreate', async message => {
    if(message.author.bot) return;
	if(message.channel.type !== 0) return;
	if(!message.content.startsWith(prefix)) return; 
	const args = message.content.slice(prefix.length).trim().split(/ +/g); 
	const cmd = args.shift().toLowerCase();
	if(cmd.length == 0 ) return;
	let command = client.prefixo.get(cmd)


	if(!command) command = client.prefixo.get(client.aliases.get(cmd));

if (!command) return message.reply({
  content: `O comando mw!${message.content} não existe.`
})

command.run(client, message, args)

})
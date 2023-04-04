const client = require("../bot.js");
const {PermissionsBitField} = require("discord.js")


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

if (!command) return;

let channel = client.channels.cache.get("751536507218690178")

if (channel.id !== message.channel.id){

    let guildMember = message.guild.members.cache.get(`${message.author.id}`);
  
  if (!guildMember.permissions.has([PermissionsBitField.Flags.ManageMessages])) {
    return message.reply({
  content: `Hey! Você só pode utilizar meus comandos no chat <#751536507218690178>!`
})
  } else {
    return command.run(client, message, args)
  }
}

return command.run(client, message, args)

})
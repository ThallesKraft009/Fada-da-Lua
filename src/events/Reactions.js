const client = require("../bot.js");
const { EmbedBuilder, Events } = require("discord.js");

const { atualizar_msg, remove_reaction } = require("../functions/estrelinhas.js");

client.on(Events.MessageReactionAdd, async(reaction, user) => {

  if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
  };

 /* if (reaction.message.author.bot) return;
  if (user.bot) return;
  if (reaction.message.author === user) return;*/
  
  if (reaction.emoji.name === "⭐"){

    atualizar_msg(client, reaction.message);
    
  }
})


client.on(Events.MessageReactionRemove, async(reaction, user) => {

 /* if (reaction.message.author.bot) return;
  if (user.bot) return;
  if (reaction.message.author === user) return;*/

  if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
  };

  if (reaction.emoji.name === "⭐"){

  remove_reaction(client, reaction.message);

  }
  
})
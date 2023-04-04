const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

const { Play } = require("./start.js");

module.exports = async(client, message) => {

let emoji = {
  play: "<:play:1076261986117103706>",
  menu: "<:menu:1076262304708055183>",
  help: "<:help:1076262565346279524>"
};


  let main = new EmbedBuilder()
  .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
  .setDescription(`O RPG é inspirado de um Survival do Mini World: Creata e também irá servir pra ajudar você pra quando for iniciar um survival!`)
  .setColor("Yellow")

  let msg = await message.reply({
    embeds: [main]
  });

  msg.react(`${emoji.play}`);

  const collector = msg.createReactionCollector({ time: ms("1h") });

collector.on("collect", async(reaction, user) => {

  await reaction.users.remove(user.id);

  if (user.id !== message.author.id) return;

  if (reaction.emoji.name === `play`){}
})
  
};
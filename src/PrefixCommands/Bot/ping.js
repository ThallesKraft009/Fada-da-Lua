const { EmbedBuilder, 
       ActionRowBuilder,
       ButtonBuilder,
       ButtonStyle } = require("discord.js");

module.exports = {
  name: "ping",

  run: async(client, message, args) => {


let gateway = client.ws.ping;
let apiPing = Date.now() - message.createdTimestamp;


let shard = {};
shard.guilds = await client.shard.fetchClientValues("guilds.cache.size")

shard.users = await client.shard.broadcastEval((c) => c.guilds.cache.map((guild) => 
    guild.members.cache.size));


console.clear()
    console.log(shard.guilds, shard.users)

    const msg = await message.reply({content: "Ping?"})

    let botao = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel("Shards")
      .setCustomId("shard")
      .setStyle(ButtonStyle.Secondary)
    );

    msg.edit({
      content: `Pong! 🏓\nGateway Ping: **\`${gateway}ms\`**\nApi Ping: **\`${apiPing}ms\`**`,
      components: [botao]
    })

    


   }
}
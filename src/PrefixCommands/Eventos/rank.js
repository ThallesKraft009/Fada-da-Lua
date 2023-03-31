const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "rank-pascoa",

  run: async(client, message, args) => {
    let userdb = await client.userdb.find({})
      
  userdb.sort((a,b) => (b.pascoa.pontos + b.pascoa.pontos) - (a.pascoa.pontos + a.pascoa.pontos))
      
      userdb = userdb.slice(0, 10);

        let embed = new EmbedBuilder()
           .setAuthor({ name: "Rank de Páscoa", iconURL: `${message.author.displayAvatarURL()}` })
          .setDescription(`${userdb.map((user, i) => `#${i+1} | **${client.users.cache.get(user.userID) || `sumido#0000`}** (🐇 ${user.pascoa.pontos})`).join("\n ")}`)
           .setColor("Yellow")
           .setTimestamp()
           .setFooter({ text: `Top 10 Usuários`})

    message.reply({
      embeds: [embed]
    })
  }
}
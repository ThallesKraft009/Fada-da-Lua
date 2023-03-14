const ver = true;
const Fornalha = require("../../Utils/Fornalha");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "test",

  run: async(client, message, args) => {
    if (ver !== true) return;


    const a = new Fornalha(client);

    let embed = new EmbedBuilder()
    .setColor("Blue")

    const msg = await message.reply({
      content: "."
    })

  a.on(async(map, verificar) => {

       embed = embed.setDescription(`${map}`)

    await msg.edit({
      embeds: [embed]
    })
  })
    
  }
}
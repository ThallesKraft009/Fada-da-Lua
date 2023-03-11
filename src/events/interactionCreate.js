const { ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder } = require("discord.js");
const client = require("../bot.js");
const fada = client;

client.on("interactionCreate", async(interaction) => {

  /* ========== slashCommands ========= */
if (interaction.isChatInputCommand()){
  
  const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction);
    } catch (e) {
      console.error(e)
    };
  };

  /* ======= rank estrelas ======== */

  if (interaction.isButton()){

if (interaction.customId === "rank_estrelinhas"){

  let { guild } = interaction;
  
      let userdb = await client.userdb.find({})
      
  userdb.sort((a,b) => (b.estrelas + b.estrelas) - (a.estrelas + a.estrelas))
      
      userdb = userdb.slice(0, 10);

        let embed = new EmbedBuilder()
           .setAuthor({ name: "Rank de estrelinhas", iconURL: `${interaction.user.displayAvatarURL()}` })
          .setDescription(`${userdb.map((user, i) => `#${i+1} | **${client.users.cache.get(user.userID) || `sumido#0000`}** (⭐ ${user.estrelas})`).join("\n ")}`)
           .setColor("Yellow")
           .setTimestamp()
           .setFooter({ text: `Top 10 Usuários`})

      let msg = await interaction.reply({
         embeds: [embed],
         ephemeral: true
       })
    }
  }
});
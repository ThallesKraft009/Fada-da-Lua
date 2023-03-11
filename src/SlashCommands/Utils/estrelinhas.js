const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "estrelinhas",
  description: "Informações sobre as estrelinhas",
  type: 1,
  options: [
    {
      name: "ver",
      description: "Veja suas estrelinhas ou de outro membro",
      type: 1,
      options: [
        {
          name: "membro",
          description: "Mencione um membro ou insira o ID",
          type: 6,
          required: false
        }
      ]
    },{
      name: "rank",
      description: "Veja o rank de estrelinhas",
      type: 1
    }
  ],
  run: async(client, interaction) => {
    let cmd = interaction.options.getSubcommand();
    let { guild } = interaction;

    if (cmd === "ver"){

let user = interaction.options.getUser("membro") || interaction.user

let userdb = await client.userdb.findOne({
         userID: user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: user.id })
     }

      let msg;
      
      if (interaction.user === user) msg = `🌟 | Você tem **\`${userdb.estrelas}\`** estrelinhas!`;

      if (interaction.user !== user) msg = `🌟 | ${user} tem **\`${userdb.estrelas}\`** estrelinhas!`;

      interaction.reply({
        content: `${msg}`,
        ephemeral: true
      })
    } else if (cmd === "rank") {
let userdb = await client.userdb.find({})
      
  userdb.sort((a,b) => (b.estrelas + b.estrelas) - (a.estrelas + a.estrelas))
      
      userdb = userdb.slice(0,15);


      let embed = [];

        let estrutura = new EmbedBuilder()
           .setAuthor({ name: "Rank de estrelinhas", iconURL: `${guild.iconURL()}` })
          .setDescription(`${userdb.map((user, i) => `#${i+1} | **${client.users.cache.get(user.userID) || `sumido#0000`}** (⭐ ${user.estrelas})`).join("\n> ")}`)
           .setColor("Yellow")
           .setTimestamp()


      embed.push(estrutura);

 interaction.reply({
   embeds: embed,
   ephemeral: true
 })


    }
  }
};
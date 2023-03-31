const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ovos-de-pascoa",

  run: async(client, message, args) => {

    let user;
    if (!message.mentions.members.first()) {
      user = client.users.cache.get(args[0]);
    } else {
      user = message.mentions.users.first();
    }

  if (!user) user = message.author;

    const author = client.users.cache.get(`${user.id}`);

    let userdb = await client.userdb.findOne({
         userID: author.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: author.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: author.id })
           }


    /*
    <:ovo_pascoa_4:1087079100407107715> (vermelho)
<:ovo_pascoa_2:1087078981020438640> (dourado)
<:ovo_pascoa_3:1087078854151114752> (verde)
<:ovo_pascoa_1:1087078709699301518> (azul
    */

    let embed = new EmbedBuilder()
      .setAuthor({ name: `${author.tag}`, iconURL: `${author.displayAvatarURL()}`})
      .setDescription(`<:ovo_pascoa_2:1087078981020438640> | ${userdb.pascoa.ovo_dourado}\n<:ovo_pascoa_4:1087079100407107715> | ${userdb.pascoa.ovo_vermelho}\n<:ovo_pascoa_3:1087078854151114752> | ${userdb.pascoa.ovo_verde}\n<:ovo_pascoa_1:1087078709699301518> | ${userdb.pascoa.ovo_azul}\n\nPontos: ${userdb.pascoa.pontos}`)
    .setColor("Random")
    .setTimestamp()

message.reply({
  embeds: [embed]
})
    
  }
}
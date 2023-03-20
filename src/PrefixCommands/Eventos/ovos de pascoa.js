const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ovos-de-pascoa",

  run: async(client, message, args) => {

    let { author } = message;

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
      .setDescription(`<:ovo_pascoa_2:1087078981020438640> | ${userdb.pascoa.ovo_dourado}
      <:ovo_pascoa_4:1087079100407107715> | ${userdb.pascoa.ovo_vermelho}
      <:ovo_pascoa_3:1087078854151114752> | ${userdb.pascoa.ovo_verde}
      <:ovo_pascoa_1:1087078709699301518> | ${userdb.pascoa.ovo_azul}\n\nPontos: ${userdb.pascoa.pontos}`)
    .setColor("Random")
    .setTimestamp()

message.reply({
  embeds: [embed]
})
    
  }
}
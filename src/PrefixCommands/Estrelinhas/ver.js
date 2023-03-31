module.exports = {
  name: "estrelinhas ver",
  aliases: ["estrelinhas-ver", "estrelinhas"],

  run: async(client, message, args) => {

    let membro = message.mentions.members.first() || client.users.cache.get(args[0]) || message.author;

    const user = membro;

    let userdb = await client.userdb.findOne({
         userID: user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: user.id })
     }

           
    if (user.id === message.author.id) {

      message.reply({
        content: `🌟 | Você tem ${userdb.estrelas} estrelinhas!`
      })
    } else {
      
      message.reply({
        content: `🌟 | **\`${user.tag}\`** tem ${userdb.estrelas} estrelinhas!`
      })
    }
 }
}
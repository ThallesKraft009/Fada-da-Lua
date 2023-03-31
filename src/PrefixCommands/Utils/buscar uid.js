module.exports = {
  name: "buscar uid",
  aliases: ["buscar-uid", "search uid", "search-uid"],

   run: async(client, message, args) => {

     let membro;
    if (!message.mentions.members.first()) {
      membro = client.users.cache.get(args[0]);
    } else {
      membro = message.mentions.users.first();
    }

  if (!membro) return message.reply({
    content: `:x: | Mencione alguém ou insira o ID do membro.`
  })

     const user = membro;

     let userdb = await client.userdb.findOne({
         userID: user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: user.id })
     }

        
//console.log(userdb);
     
      message.reply({
       content: `O uid de **\`${membro.username}\`** é ${userdb.uid}`
     })
   }
}
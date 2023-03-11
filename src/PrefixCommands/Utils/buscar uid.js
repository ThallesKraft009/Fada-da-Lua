module.exports = {
  name: "buscar uid",
  aliases: ["buscar-uid", "search uid", "search-uid"],

   run: async(client, message, args) => {

     let membro = client.users.cache.get(message.mentions.members.first().id) || client.users.cache.get(args[0]);

      if (!membro) return message.reply({
        content: `Mencione um membro ou insira o id apos o comando, exemplo: **\`mw!buscar uid @membro\`**`
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
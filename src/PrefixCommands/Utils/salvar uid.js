module.exports = {
  name: "salvar uid",
  aliases: ["uid save", "salvar-uid", "uid-save"],

  run: async(client, message, args) => {

    let uid = args[0];
      uid = Number(`${uid}`);

      if (!uid) return message.reply({
           content: `${message.author} você precisa inserir o seu uid após o comando, exemplo: **\`mw!salvar uid [seu uid]\`**`
      });

    let userdb = await client.userdb.findOne({
         userID: message.author.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: message.author.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: message.author.id })
     }

     await client.userdb.updateOne({
         userID: message.author.id
     }, { $set: {
         "uid": uid
     }
     }).then(async() => {

client.channels.cache.get(`${client.chat.uid}`)
       .send({
         content: `**\`${message.author.tag}\`** salvou seu uid pra: ${uid}`
       })

       
       await message.reply({
         content: `Seu uid foi salvo pra: **\`${uid}\`**.`
       })
     })
  }
}
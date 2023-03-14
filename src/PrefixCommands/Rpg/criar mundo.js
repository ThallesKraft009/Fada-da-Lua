module.exports = {
  name: "novo-mundo",
  aliases: ["create-world", "criar-mundo", "new-world"],

  run: async(client, message, args) => {

     let { guild, author, channel } = message;

  let name = args.join(" ");
    if (!name) return message.reply({
      content: `Você precisa inserir o nome de seu mundo.`
    });

    let mundodb = await client.mundodb.findOne({
         userID: author.id
     })
      
     if(!mundodb){
         const newworld = new client.mundodb({ userID: author.id })
         await newworld.save();
         
         mundodb = await client.mundodb.findOne({ userID: author.id })
     };


     if (mundodb.mundo.nome === null){

      let users = [];
       users.push(author);
       

         await client.mundodb.updateOne({
         userID: author.id
     }, { $set: {
         "mundo.nome": name,
         "mundo.users": users
     }
     })

       message.reply({
         content: "O mundo foi criado!"
       })
       
     } else {
       message.reply({
         content: "Você já criou um mundo!"
       })
     }
  }
}
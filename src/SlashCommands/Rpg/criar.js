module.exports = {
  name: "criar",
  description: "Crie coisas no rpg",
  type: 1,
  options: [
    {
      name: "mundo",
      description: "Crie seu mundo no rpg",
      type: 1,
      options: [
        {
          name: "nome",
          description: "Escreva o nome de seu mundo",
          type: 3,
          required: true
        }
      ]
    }
  ],

  run: async(client, interaction) => {
    let { user } = interaction;

    let mundodb = await client.mundodb.findOne({
         userID: user.id
     })
      
     if(!mundodb){
         const newworld = new client.mundodb({ userID: user.id })
         await newworld.save();
         
         mundodb = await client.mundodb.findOne({ userID: user.id })
     };

let cmd = interaction.options.getSubcommand();
    /*=============== MUNDO ============*/

    if (cmd === "mundo"){
  let name = interaction.options.getString("nome");

if (mundodb.mundo.nome === null){

      let users = [];
       users.push(user);
       

         await client.mundodb.updateOne({
         userID: user.id
     }, { $set: {
         "mundo.nome": name,
         "mundo.users": users
     }
     })

       interaction.reply({
         content: "O mundo foi criado!",
          ephemeral: true
       })
       
     } else {
       interaction.reply({
         content: "Você já criou um mundo!",
         ephemeral: true
       })
}
      
    }
    
  }
}
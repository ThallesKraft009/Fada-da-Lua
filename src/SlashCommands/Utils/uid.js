module.exports = {
  name: "uid",
  description: "Gerenciamento de Uid",
  type: 1,
  options: [
    {
      name: "salvar",
      description: "Salve seu uid",
      type: 1,
      options: [
        {
          name: "uid",
          description: "Insira seu uid",
          type: 10,
          required: true
        }
      ]
    },{
      name: "buscar",
      description: "Veja o UID de algum membro",
      type: 1,
      options: [
        {
          name: "membro",
          description: "Selecione o membro",
          type: 6,
          required: true
        }
      ]
    }
  ],
  run: async(client, interaction) => {
let comando = interaction.options.getSubcommand()

    

    if (comando === "salvar") {

      let uid;
      uid = interaction.options.getNumber("uid");
      let { user, guild } = interaction;

      await client.userdb.updateOne({
         userID: user.id
     }, { $set: {
         "uid": uid
     }
     })

      client.channels.cache.get(`${client.chat.uid}`)
       .send({
         content: `**\`${user.tag}\`** salvou seu uid pra: ${uid}`
       })

      interaction.reply({
        content: `Seu uid foi salvo pra **\`${uid}\`**`,
        ephemeral: true
      })

    } else if (comando === "buscar") {
let user = interaction.options.getUser("membro");
      user = client.users.cache.get(user.id);
      
      let userdb = await client.userdb.findOne({
         userID: user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: user.id })
        }


      interaction.reply({
        content: `O uid de ${user} é ${userdb.uid}!`,
        ephemeral: true
      })
    }
  }
}
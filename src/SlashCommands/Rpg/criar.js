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
    },{
      name: "item",
      description: "Crie itens no rpg",
      type: 1,
      options: [
        {
          name: "nome",
          description: "Qual item você quer criar",
          type: 3,
          required: true,
          choices: [
            {
              name: "Graveto",
              value: "1"
            }
          ]
        },{
          name: "quantidade",
          description: "Quantos itens você quer criar",
type: 10,
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
      
    } else if (cmd === "item"){

let item = interaction.options.getString("nome");
let quant = interaction.options.getNumber("quantidade");

      if (item === "1"){

        let madeiras = mundodb.blocos.madeira;

        if (quant > madeiras) return interaction.reply({
        content: `Você precisa ter mais ${quantidade - madeiras} madeiras pra criar ${quantidade} gravetos`,
        ephemeral: true
      });


await client.mundodb.updateOne({
         userID: user.id
     }, { $set: {
         "blocos.madeira": mundodb.blocos.madeira - quant,
          "item.gravetos": mundodb.item.gravetos + quant
     }
     })

      interaction.reply({
        content: `Você criou ${quantidade} gravetos!`,
      })
        
      }


    }
  }
}
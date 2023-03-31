module.exports = {
  name: "update",

  run: async(client, message, args) => {

    let user = args[0];
    let e = Number(`${args[1]}`);


    let userdb = await client.userdb.findOne({
         userID: user
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: user })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: user })
     }

    await client.userdb.updateOne({
         userID: user
     }, { $set: {
         "estrelas": userdb.estrelas + e
     }
     })

    message.reply({
      content: `UserId: ${user} | ${userdb.estrelas} + ${e} = ${userdb.estrelas + e}`
    })
  }
}
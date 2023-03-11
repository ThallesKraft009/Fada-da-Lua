const client = require("../bot.js");

  client.db = async function(func) {
    console.log(user.id);
    
    let userdb = await client.userdb.findOne({
         userID: user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: user.id })
     }

    func(userdb)
  }

const client = require("../bot.js");

async function db(author){
  let mundodb = await client.mundodb.findOne({
         userID: author.id
     })
      
     if(!mundodb){
         const newworld = new client.mundodb({ userID: author.id })
         await newworld.save();
         
         mundodb = await client.mundodb.findOne({ userID: author.id })
     };

     return mundodb;
}

module.exports = { db };
const { connect } = require("mongoose");
const c = require("colors");

module.exports = (client) => {

const conectar = async() => {

    await connect(client.config.mongo).then(() => {
      console.log(c.blue("[INFO]: Ready MongoDB ✅\n"));
    })
};


client.once("ready", () => {
  conectar()
})


client.userdb = require("./Database/user.js");
client.svdb = require("./Database/sv.js");
client.msg = require("./Database/messages.js");
client.mundodb = require("./Database/rpg.js");
client.pascoa_db = require("./Database/evento.js");
 
 }
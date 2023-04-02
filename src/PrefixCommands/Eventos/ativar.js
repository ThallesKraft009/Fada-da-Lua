const { QuickDB } = require("quick.db");
const db_ = new QuickDB();

module.exports = {
  name: "evento",

  run: async(client, message, args) => {

if (message.author.id !== "423095096897175552") return;

    let db = await db_.get("verificar_evento");

    message.react("✅");

    if (!db || db === null || db === false) {

      await db_.set("verificar_evento", true);

    } else {

      await db_.set("verificar_evento", false);

    }
  }
}
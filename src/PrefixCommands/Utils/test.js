const RpgGame = require("../../Utils/Rpg.js");

module.exports = {
  name: "test",

  run: async(client, message, args) => {

    const Game = new RpgGame(message, false);

    await Game.coletarMadeira()
  }
}
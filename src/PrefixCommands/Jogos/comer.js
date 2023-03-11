const SnakeGame = require("../../Utils/comer.js");

module.exports = {
  name: "snakegame",

  run: async(client, message, args) => {

    const Game = new SnakeGame(client, {
      message: message,
      isSlashGame: false
    });

    Game.startGame()
    
  }
}
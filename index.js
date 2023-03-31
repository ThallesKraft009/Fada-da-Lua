const { ShardingManager } = require('discord.js');
const config = require("./src/config.js");

const manager = new ShardingManager('./src/bot.js', {
  token: config.token, 
  totalShards: "auto"
});

manager.on('shardCreate', async(shard) => {
  console.log(`Shard (${shard.id}) conectada.`)
});

module.exports = manager;

manager.spawn();



process.on('uncaughtException', function (err) {
  console.error(err);
});
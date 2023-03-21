const client = require("../bot.js");
const c = require("colors");
const { EmbedBuilder, version } = require("discord.js");

const ms = require("ms");

client.on("ready", async () => {
  console.log(c.blue(`${client.user.username} está online!`));

  let activities = [
	{ name: `Shard 0 | Users: ${client.users.cache.size} | Guild: `, type: 0 }, 
];

  setInterval(() => {
  activities = [
	{ name: `Shard 0 | Users: ${client.users.cache.size} | Guild: `, type: 0 }, 
];
  }, 50000)
  

const status = [
	'dnd',
	'dnd',
	'dnd',
  'dnd'
];
  
let i = 0;
setInterval(() => {
	if(i >= activities.length) i = 0
	client.user.setActivity(activities[i])
	i++;
}, 15 * 1000); // 30 Segundos

let s = 0;


setInterval(() => {
	if(s >= activities.length) s = 0
	client.user.setStatus(status[s])
	s++;
}, 30 * 1000); 

client.msgC = {};
  
client.channels.cache.forEach(channel => {

  

  if (channel.type === 0 || channel.type === "0"){

  client.msgC[channel.id] = {};


  client.msgC[channel.id] = channel.createMessageComponentCollector();

    console.log(channel.name, " ok ");
    
  }
})
})
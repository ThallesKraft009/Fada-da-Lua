const client = require("../bot.js");
const c = require("colors");
const { EmbedBuilder, version } = require("discord.js");
const ms = require("ms");

client.on("ready", async () => {

  let a = 0;

  let guilds = [];

client.guilds.cache.forEach(x => {

  guilds.push(x)
  
});

console.log(guilds.length)


  let activities = [
	{ name: `Iniciando...`, type: 0 }, 
];

  setInterval(() => {

guilds = [];

client.guilds.cache.forEach(x => {

  guilds.push(x)
  
});

let b = Math.floor(Math.random() * guilds.length);
    
    activities = [
	{ 
    name: `Shard 0 | ${guilds[b].name} | ${guilds[b].members.cache.size} members`,
    type: 0 
  },{
    name: "Mini World: Create",
    type: 0
  }
];


}, 10 * 1000)
  

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
  console.log(
    c.yellow(`Status Atualizado para `), 
    c.green(`"${activities[i].name}"\n`)
  )
	i++;

  
}, 15 * 1000); // 30 Segundos

let s = 0;


setInterval(() => {
	if(s >= activities.length) s = 0
	client.user.setStatus(status[s])
	s++;
}, 30 * 1000); 

client.msgC = {};

  client.guilds.cache.forEach(guild => {
    console.log(c.cyan("Guild: (guild) foi logado!".replace("(guild)", guild.name)))
  })

  const start = () => {

    console.log(c.yellow("Criando collector em cada chat....\n\n"))
  
client.channels.cache.forEach(channel => {

  if (channel.type === 0 || channel.type === "0"){

  client.msgC[channel.id] = {};

  client.msgC[channel.id] = channel.createMessageComponentCollector({ time: ms("1h") });

  }

  })

      console.log("\nCollector criado em cada chat.\n\n")
     
}

  start();

  console.log(c.blue(`${client.user.username} está online!\n`));
  
setInterval(() => {
  start();
}, ms("1h"))
})
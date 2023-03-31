const client = require("../bot.js");
const c = require("colors");
const { EmbedBuilder, version } = require("discord.js");
const ms = require("ms");



client.on("ready", async () => {

const logs = client.channels.cache.get("1089533673163997224")

 logs.send({
    content: "```js\n\"Shard [0] conectada.\"\n```"
  })

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
    name: `Shard [0] | ${guilds[b].name} | ${guilds[b].members.cache.size} members`,
    type: 0 
  },{
    name: "Mini World: Creata",
    type: 0
  },{
    name: `🐇 | Feliz Páscoa! | Shard [0]`,
    type: 0
  },{
    name: "Escolhendo uma mensagem pra reagir 🐇 | Shard [0]",
    type: 0
  },{
    name: `Versão ${client.config.version}`,
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

  let ping = client.ws.ping;
  
let i = 0;
setInterval(() => {
	if(i >= activities.length) i = 0
	client.user.setActivity(activities[i])
  ping = client.ws.ping;
  logs.send({
    content: `\`\`\`js\nStatus atualizado para: "${activities[i].name}"\n\`\`\``
  })
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

   logs.send({
     content: `> GUILD: **\`${guild.name}\`** connected.`
   })
  })

 /* const start = async() => {

    console.log(c.yellow("Criando collector em cada chat....\n\n"))

  let msg = await logs.send({
      content: "Criando collector em todos os chats..."
    })
  
client.channels.cache.forEach(channel => {

  if (channel.type === 0 || channel.type === "0"){

  client.msgC[channel.id] = {};

  client.msgC[channel.id] = channel.createMessageComponentCollector({ time: ms("1h") });

  }

  })

      console.log("\nCollector criado em cada chat.\n\n")
     
msg.reply({
  content: `\n\nTodos os collectores criados em ${client.channels.cache.size} chats de texto.`
})

}

  start();

  console.log(c.blue(`${client.user.username} está online!\n`));*/

  logs.send({
    content: "\n\n**Fada da lua está totalmente iniciada!**"
  })
  /*
setInterval(() => {
  start();
}, ms("1h"))*/
})
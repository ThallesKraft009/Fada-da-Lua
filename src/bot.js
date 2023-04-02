const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const fs = require("fs");
const express = require("express");

const app = express();
app.get("/", async(req, res) => {

                   console.log("ping recebido")
  res.json({ ok: "OK"})
})


//require("./Json/Perguntas/perguntas.js");

const EventEmitter = require('events');
const emitter = new EventEmitter()
emitter.setMaxListeners(500)

const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ],
});
module.exports = client;

const { token } = require("./config");
client.config = require("./config.js");
client.chat = require("./Json/channels");
client.musicas = require("./Json/music");
require("./MongoDB/conection.js")(client);

client.events = new Collection();
client.prefixo = new Collection();
client.cooldowns = new Collection();
client.subcmd = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.categories =  fs.readdirSync("./src/SlashCommands/");


["event_handler", "slash_handler", "functions", "prefix_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});




client.login(token);

     app.listen(process.env.PORT)
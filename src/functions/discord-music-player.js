const client = require("../bot.js");
require("isomorphic-unfetch");

const { Player } = require('discord-music-player');

const player = new Player(client, {
   leaveOnEmpty: true
});

client.player = player;
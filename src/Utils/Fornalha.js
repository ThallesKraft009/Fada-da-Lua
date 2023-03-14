const events = require('events');
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ms = require("ms");
const wait = require('node:timers/promises').setTimeout;


module.exports = class Fornalha extends events {
  constructor(client){


    if (!client) client = require("../bot.js");

       super();

      this.client = client;

   }

  on(func){

    const atualizar = async() => {
    let a = "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛";
    func(a, false)

    await wait(1000)
    a = "⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛";
    func(a, false)

    await wait(1000)
    a = "⬜⬜⬛⬛⬛⬛⬛⬛⬛⬛";
    func(a, false)

    await wait(1000)
    a = "⬜⬜⬜⬛⬛⬛⬛⬛⬛⬛";
    func(a, false)

    await wait(1000)
    a = "⬜⬜⬜⬜⬛⬛⬛⬛⬛⬛";
    func(a, false)

    await wait(1000)
    a = "⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛";
    func(a, false)
  
    await wait(1000)
    a = "⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛";
    func(a, false)

    await wait(1000)
    a = "⬜⬜⬜⬜⬜⬜⬜⬛⬛⬛";
    func(a, false)

    await wait(1000)
    a = "⬜⬜⬜⬜⬜⬜⬜⬜⬛⬛";
    func(a, false)

    await wait(1000)
    a = "⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛";
    func(a, false)

    await wait(1000)
    a = "⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜";
    func(a, true)
  }

    atualizar()
  }
}
module.exports = {
  name: "trilha",
  description: "Troque as musicas do mw",
  type: 1,
  options: [
    {
      name: "sonora",
      description: "Troque as trilhas sonoras do Mini World",
      type: 1
    }
  ],
  run: async(client, interaction) => {
    let cmd = interaction.options.getSubcommand();
    console.log(interaction.options)
    let { guild, user } = interaction;

    if (cmd === "sonora"){

let guildQueue = client.player.getQueue(guild.id);

let user_voice = interaction.member.voice.channel;
      if (!user_voice) return interaction.reply({
        content: `Você precisa está em um canal de voz!`,
        ephemeral: true
      })
      
let queue = client.player.createQueue(guild.id);

      let musica = client.musicas.trilha_sonora;
      
  await queue.join(user_voice);
  
let song = await queue.playlist(musica)
  .catch(err => {
            console.log(err);
            if(!guildQueue)
                queue.stop();
        });

      interaction.reply({
        content: `💫 | Tocando as trilhas sonoras no canal  ${user_voice}!`
      })
    }
  }
}
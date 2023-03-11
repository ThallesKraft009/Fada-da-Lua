module.exports = {
  name: "trilhasonora",


  run: async(client, message, args) => {

    let { guild, author } = message;

 let guildQueue = client.player.getQueue(guild.id);

let user_voice = message.member.voice.channel;
      if (!user_voice) return message.reply({
        content: `Você precisa está em um canal de voz!`,
        ephemeral: true
      })
      
let queue = client.player.createQueue(guild.id);

      let musica = client.musicas.trilha_sonora;
      
  await queue.join(user_voice);
  
let som = await queue.playlist(musica)
  .catch(err => {
            console.log(err);
            if(!guildQueue)
                queue.stop();
        });

    message.reply({
      content: `💫 | Tocando as trilhas sonoras no canal ${user_voice}!`
    })
  }
}
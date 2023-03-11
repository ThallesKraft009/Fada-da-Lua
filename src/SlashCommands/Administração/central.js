const { EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "central",
  description: "Gerencie tudo na Fada da Lua",
  type: 1,
  default_member_permissions: 'BanMembers',

  run: async(client, interaction) => {
    
//Secondary
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Gerenciar Dados')
		      .setCustomId('manage_dados')
          .setStyle(ButtonStyle.Secondary),
         new ButtonBuilder()
					.setLabel('Gerenciar Fada')
		      .setCustomId('manage_fada')
          .setStyle(ButtonStyle.Secondary)
			);


     await interaction.reply({
       content: "Não sei o que eu coloco aqui..",
       components: [row]
     })

  const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

collector.on('collect', async i => {

  if (i.user !== interaction.user) return i.reply({
    content: `Espere um minuto.... você não é ${interaction.user}! Sai daqui!`,
      ephemeral: true
  });


  if (i.customId === "manage_dados"){

      let botao_menu_dados = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
        .setLabel("Voltar")
        .setCustomId("back")
        .setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Estrelinhas')
		      .setCustomId('manage_star')
          .setStyle(ButtonStyle.Secondary),
         new ButtonBuilder()
					.setLabel('Uids')
		      .setCustomId('manage_uid')
          .setStyle(ButtonStyle.Secondary)
			);

    await i.deferUpdate()

    let embed_menu_dados = new EmbedBuilder()
    .setDescription("Não sei o que eu coloco aqui..")

       i.editReply({
         content: `${i.user}`,
         embeds: [embed_menu_dados],
         components: [botao_menu_dados]
       })
    
  } else if (i.customId === "manage_star"){
    await i.deferUpdate()

    let botao_star = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
        .setLabel("Voltar")
        .setCustomId("back")
        .setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Selecionar Membro')
		      .setCustomId('select_member')
          .setStyle(ButtonStyle.Secondary),
         new ButtonBuilder()
					.setLabel('Enviar Rank')
		      .setCustomId('send_rank')
          .setStyle(ButtonStyle.Success)
			);

    i.editReply({
      components: [botao_star]
    });
    
  } else if (i.customId === "select_member"){
    
  }
});
  }
}
const InteractionCreate = {
  name: "interactionCreate",
  async execute(interaction) {
    // command
    if (interaction.isCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      // check if valid channel (only if channels array exists AND has items)
      if (
        command.channels &&
        command.channels.length > 0 &&
        !command.channels.includes(interaction.channel.name)
      ) {
        await interaction.reply({
          content: `❌ This command can only be used in #${command.channels.join(', #')}.`,
          ephemeral: true,
        });
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }

    // select menu
    if (interaction.isSelectMenu()) {
      const command = interaction.client.commands.get(
        interaction.message.interaction.commandName,
      );
      if (!command) return;

      try {
        await command.onSelect(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};

export default InteractionCreate;
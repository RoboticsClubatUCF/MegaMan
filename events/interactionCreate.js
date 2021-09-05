const InteractionCreate = {
  name: 'interactionCreate',
  async execute(interaction) {
    // command
    if (interaction.isCommand()) {
      const command = interaction.client.commands.get(interaction.commandName)
      if (!command) return

      try {
        await command.execute(interaction)
      } catch (error) {
        console.error(error)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
      }
    }

    // select menu
    if (interaction.isSelectMenu()) {
      const command = interaction.client.commands.get(interaction.message.interaction.commandName)
      if (!command) return

      try {
        await command.onSelect(interaction)
      } catch (error) {
        console.error(error)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
      }
    }
  }
}

export default InteractionCreate
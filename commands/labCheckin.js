import { SlashCommandBuilder } from '@discordjs/builders'
import status from '../utils/labStatus.js'

const LabCheckin = {
  builder: new SlashCommandBuilder()
    .setName('labcheckin')
    .setDescription('checkin to the lab.')
    .addIntegerOption(option => 
      option.setName('close')
        .setDescription('Hour you are closing in 24hr time.')
        .setRequired(true)
    )
    .setDefaultPermission(false),
  channels: ['officers'],
  roles: ['Officers'],
  async execute(interaction) {
    const close = interaction.options.getInteger('close')

    if (close < 1 || close > 23) {
      await interaction.reply({ content: 'Closing hour must be between 1 and 23.', ephemeral: true })
      return
    }

    status.data.push({
      id: interaction.user.id,
      close: interaction.options.getInteger('close')
    })

    await interaction.reply(`Set lab status to open till ${close}:00.`)
  }
}

export default LabCheckin

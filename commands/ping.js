import { SlashCommandBuilder } from '@discordjs/builders'

const Ping = {
  builder: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!')
  }
}

export default Ping
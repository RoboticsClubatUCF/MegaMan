import { SlashCommandBuilder } from '@discordjs/builders'

const NMembers = {
  builder: new SlashCommandBuilder()
    .setName('nmembers')
    .setDescription('Returns the number of members on the server.'),
  async execute(interaction) {
    const role = interaction.guild.roles.cache.find(role => role.name === 'Members')

    if(!role)
      return await interaction.reply('The members role does not exist')

    const total = role.members.size

    await interaction.reply(`There are currently ${total} members!`)
  }
}

export default NMembers
import { SlashCommandBuilder } from '@discordjs/builders'

const NMembers = {
  builder: new SlashCommandBuilder()
    .setName('nmembers')
    .setDescription('Returns the number of members on the server.'),
  async execute(interaction) {
    const role = await interaction.guild.roles.cache.find(role => role.name === 'Members')
    if(!role)
      return await interaction.reply('The members role does not exist')

    const members = await interaction.guild.members.fetch()
    const filtered = members.filter(member => member.roles.cache.find(r => r === role))

    await interaction.reply(`There are currently ${filtered.size} members!`)
  }
}

export default NMembers
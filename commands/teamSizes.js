import { SlashCommandBuilder } from '@discordjs/builders'

const TeamSizes = {
  builder: new SlashCommandBuilder()
    .setName('teamsizes')
    .setDescription('Returns the number of members on each team.'),
  async execute(interaction) {
    const roleM = await interaction.guild.roles.fetch()
    const roles = await roleM.filter(role => role.name.endsWith('Team'))

    const data = {}
    roles.forEach(role => data[role.name] = role.members.size)
    console.log(data)

    // await interaction.reply(`There are currently ${filtered.size} members!`)
  }
}

export default TeamSizes
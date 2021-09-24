import { SlashCommandBuilder } from '@discordjs/builders'

const TeamSizes = {
  builder: new SlashCommandBuilder()
    .setName('teamsizes')
    .setDescription('Returns the number of members on each team.'),
  channels: ['bot-cmds'],
  async execute(interaction) {
    const roleM = await interaction.guild.roles.fetch()
    const roles = roleM.filter(role => role.name.endsWith('Team'))

    let reply = ''
    roles.forEach(role => reply += `\`\`\`${role.name}: ${role.members.size}\`\`\``)

    await interaction.reply(reply)
  }
}

export default TeamSizes
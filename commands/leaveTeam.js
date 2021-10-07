import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageSelectMenu } from 'discord.js'

const options = [
  {
    label: 'AGV',
    description: 'AGV Team: Bowser',
    value: 'agv'
  },
  {
    label: 'Discord',
    description: 'Discord Team: Mega Man',
    value: 'discord'
  },
  {
    label: 'Line Tracker',
    description: 'Line Tracker Team: Line Tracker Robots',
    value: 'linetracker'
  },
  {
    label: 'Pac-Man',
    description: 'Pac-Man Team: Pac-Man',
    value: 'pacman'
  },
  {
    label: 'Spider Bot',
    description: 'Spider Bot Team: Spider-Bot/Demobot',
    value: 'spiderbot'
  }
]

const rolesMap = {
  agv: 'AGV Team',
  spiderbot: 'SpiderBot Team',
  discord: 'Discord Team',
  linetracker: 'Line Tracking Team',
  pacman: 'Pac-Man Team'
}

const LeaveTeam = {
  builder: new SlashCommandBuilder()
    .setName('leaveteam')
    .setDescription('Leave a Team of The Robotics Club.')
    .setDefaultPermission(false),
  channels: ['bot-cmds'],
  roles: ['Members'],
  async execute(interaction) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('leaveteam')
          .setPlaceholder('Select teams to leave.')
          .setMaxValues(options.length)
          .addOptions(options)
      )

    await interaction.reply({ content: 'Select Team(s) to leave.', components: [row] })
  },
  async onSelect(interaction) {
    const roles = interaction.guild.roles.cache

    for (const val of interaction.values) {
      const role = roles.find(role => role.name === rolesMap[val])
      await interaction.member.roles.remove(role)
    }

    await interaction.update({ content: `**${interaction.member.displayName}** has left team(s): ${interaction.values.join(', ')}.`, components: [] })
  }
}

export default LeaveTeam
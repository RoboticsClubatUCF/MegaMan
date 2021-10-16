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

const rolesSet = new Set(Object.keys(rolesMap))

const Team = {
  builder: new SlashCommandBuilder()
    .setName('team')
    .setDescription('Join a Team of The Robotics Club.')
    .setDefaultPermission(false),
  channels: ['bot-cmds'],
  roles: ['Members'],
  async execute(interaction) {
    const roles = interaction.guild.roles.cache

    const memberOptions = options

    for (const option of memberOptions) {
      const role = roles.find(role => role.name === rolesMap[option.value])
      if (interaction.member.roles.resolve(role.id))
        option['default'] = true
    }

    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('team')
          .setPlaceholder('Select teams to join.')
          .setMaxValues(memberOptions.length)
          .addOptions(memberOptions)
      )

    await interaction.reply({ content: 'Select Team(s) to join.', components: [row] })
  },
  async onSelect(interaction) {
    const roles = interaction.guild.roles.cache
    const valueSet = new Set(interaction.values)
    const notSelected = new Set([...rolesSet].filter(x => !valueSet.has(x)))

    // roles to add
    valueSet.forEach(async v => {
      const role = roles.find(role => role.name === rolesMap[v])
      await interaction.member.roles.add(role)
    })

    // roles to remove
    notSelected.forEach(async v => {
      const role = roles.find(role => role.name === rolesMap[v])
      await interaction.member.roles.remove(role)
    })

    await interaction.update({ content: `**${interaction.member.displayName}** is now part of team(s): ${interaction.values.join(', ')}.`, components: [] })
  }
}

export default Team
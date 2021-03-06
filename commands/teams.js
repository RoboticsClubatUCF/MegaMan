import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageSelectMenu } from 'discord.js'

const options = [
  {
    label: 'AGV',
    description: 'AGV Team: Bowser',
    value: 'agv'
  },
  {
    label: 'Alternative Mobility',
    description: 'Alternative Mobility Team: Alternative Mobility Robot',
    value: 'alternativemobility'
  },
  {
    label: 'Bipedal',
    description: 'Bipedal Team: Bipedal Robot',
    value: 'bipedal'
  },
  {
    label: 'Chess Arm',
    description: 'Chess Arm Team: Chess Arm',
    value: 'chessarm'
  },
  {
    label: 'Discord',
    description: 'Discord Team: Mega Man',
    value: 'discord'
  },
  {
    label: 'Duckietown',
    description: 'Duckietown Team: Duckietown',
    value: 'duckietown'
  },
  {
    label: 'Garduino',
    description: 'Garduino Team: Garduino',
    value: 'garduino'
  },
  {
    label: 'Pac-Man',
    description: 'Pac-Man Team: Pac-Man',
    value: 'pacman'
  },
  {
    label: 'Demobot',
    description: 'Demobot Bot Team: Demobot/Spider-Bot',
    value: 'demobot'
  }
]

const rolesMap = {
  agv: 'AGV Team',
  alternativemobility: 'Alternative Mobility Team',
  bipedal: 'Bipedal Team',
  chessarm: 'Chess Arm Team',
  duckietown: 'Duckietown Team',
  garduino: 'Garduino Team',
  demobot: 'DemoBot Team',
  discord: 'Discord Team',
  pacman: 'Pac-Man Team'
}

const rolesSet = new Set(Object.keys(rolesMap))

const Team = {
  builder: new SlashCommandBuilder()
    .setName('teams')
    .setDescription('Join Teams of The Robotics Club.')
    .setDefaultPermission(false),
  channels: ['bot-cmds'],
  roles: ['Members'],
  async execute(interaction) {
    const roles = interaction.guild.roles.cache

    const memberOptions = options

    for (const option of memberOptions) {
      const role = roles.find(role => role.name === rolesMap[option.value])
      option['default'] = false
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

    await interaction.reply({ content: 'Select Team(s) to join.', components: [row], ephemeral: true })
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

    await interaction.update({ content: `You is now part of team(s): ${interaction.values.join(', ')}.`, components: [], ephemeral: true })
    await interaction.channel.send(`**${interaction.member.displayName}** is now part of team(s): ${interaction.values.join(', ')}.`)
  }
}

export default Team
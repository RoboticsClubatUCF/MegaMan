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
    label: 'Spider Bot',
    description: 'Spider Bot Team: Spider-Bot/Demobot',
    value: 'spiderbot'
  }
]

const rolesMap = {
  agv: 'AGV Team',
  spiderbot: 'SpiderBot Team',
  discord: 'Discord Team'
}

const JoinTeam = {
  builder: new SlashCommandBuilder()
    .setName('jointeam')
    .setDescription('Join a Team of The Robotics Club.'),
  channels: ['bot-cmds'],
  async execute(interaction) {
    // check if member role
    if (!interaction.member.roles.cache.some(role => role.name === 'Members')) {
      await interaction.reply({ content: 'You must be a Member to use this command.', ephemeral: true })
      return
    }

    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('JoinTeam')
          .setPlaceholder('Select teams to join.')
          .setMaxValues(options.length)
          .addOptions(options)
      )

    await interaction.reply({ content: 'Select Team(s) to join.', components: [row] })
  },
  async onSelect(interaction) {
    const roles = interaction.guild.roles.cache

    for (const val of interaction.values) {
      const role = roles.find(role => role.name === rolesMap[val])
      await interaction.member.roles.add(role)
    }

    await interaction.update({ content: `**${interaction.member.displayName}** has joined team(s): ${interaction.values.join(', ')}.`, components: [] })
  }
}

export default JoinTeam
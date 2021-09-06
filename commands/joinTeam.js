import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageSelectMenu } from 'discord.js'

const options = [
  {
    label: 'AGV',
    description: 'AGV Team: Bowser',
    value: 'agv'
  },
  {
    label: 'Spider Bot',
    description: 'Spider Bot Team: Spider-Bot/Demobot',
    value: 'spiderbot'
  }
]

const rolesMap = {
  agv: 'Professor',
  spiderbot: 'Admin'
}

const JoinTeam = {
  builder: new SlashCommandBuilder()
    .setName('jointeam')
    .setDescription('Join a Team of The Robotics Club.'),
  async execute(interaction) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('JoinTeam')
          .setPlaceholder('Select teams to join.')
          .setMaxValues(2)
          .addOptions(options)
      )

    await interaction.reply({ content: 'Select teams to join.', components: [row] })
  },
  async onSelect(interaction) {
    const roles = interaction.guild.roles.cache

    for (const val of interaction.values) {
      const role = roles.find(role => role.name === rolesMap[val])
      await interaction.member.roles.add(role)
    }

    await interaction.reply(`**${interaction.member.displayName}** has joined team(s): ${interaction.values.join(', ')}`)
  }
}

export default JoinTeam
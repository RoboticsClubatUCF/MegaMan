import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageSelectMenu } from 'discord.js'

const options = [
  {
    label: 'Mechanical Engineering',
    description: 'Mechanical Eng',
    value: 'mechanicaleng'
  },
  {
    label: 'Aerospace Engineering',
    description: 'Aerospace Eng',
    value: 'aerospaceeng'
  },
  {
    label: 'Computer Engineering',
    description: 'Computer Eng',
    value: 'computereng'
  },
  {
    label: 'Electrical Engineering',
    description: 'Electrical Eng',
    value: 'electricaleng'
  },
  {
    label: 'Computer Science',
    description: 'Computer Science',
    value: 'computerscience'
  },
  {
    label: 'Civil Engineering',
    description: 'Civil Eng',
    value: 'civileng'
  },
  {
    label: 'Industrial Engineering',
    description: 'Industrial Eng',
    value: 'industrialeng'
  },
  {
    label: 'Environmental Engineering',
    description: 'Environmental Eng',
    value: 'environmentaleng'
  },
  {
    label: 'Other Major',
    description: 'Other Major',
    value: 'othermajor'
  }
]

const rolesMap = {
  mechanicaleng: 'Mechanical Eng',
  aerospaceeng: 'Aerospace Eng',
  computereng: 'Computer Eng',
  electricaleng: 'Electrical Eng',
  computerscience: 'Computer Science',
  civileng: 'Civil Eng',
  industrialeng: 'Industrial Eng',
  environmentaleng: 'Environmental Eng',
  othermajor: 'Other Major'
}

const rolesSet = new Set(Object.keys(rolesMap))

const Majors = {
  builder: new SlashCommandBuilder()
    .setName('majors')
    .setDescription('Assign yourself a major role')
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
          .setPlaceholder('Select a major')
          .setMaxValues(memberOptions.length)
          .addOptions(memberOptions)
      )

    await interaction.reply({ content: 'Select major(s)', components: [row], ephemeral: true })
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

    await interaction.update({ content: `You now have the role: ${interaction.values.join(', ')}.`, components: [], ephemeral: true })
//    await interaction.channel.send(`**${interaction.member.displayName}** is now part of team(s): ${interaction.values.join(', ')}.`)
  }
}

export default Majors

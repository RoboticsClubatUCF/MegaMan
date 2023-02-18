import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageSelectMenu } from 'discord.js'

const options = [
  {
    label: 'He/Him',
    description: 'He/Him',
    value: 'hehim'
  },
  {
    label: 'She/Her',
    description: 'She/Her',
    value: 'sheher'
  },
  {
    label: 'They/Them',
    description: 'They/Them',
    value: 'theythem'
  }
]

const rolesMap = {
  hehim: 'He/Him',
  sheher: 'She/Her',
  theythem: 'They/Them'
}

const rolesSet = new Set(Object.keys(rolesMap))

const Pronouns = {
  builder: new SlashCommandBuilder()
    .setName('pronouns')
    .setDescription('Assign yourself a pronoun role!')
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
          .setPlaceholder('Select pronouns')
          .setMaxValues(memberOptions.length)
          .addOptions(memberOptions)
      )

    await interaction.reply({ content: 'Select pronoun(s)', components: [row], ephemeral: true })
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

export default Pronouns

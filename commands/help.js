import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import getCommands from '../utils/getCommands.js'

let commands
(async () => { commands = await getCommands() })()

const Help = {
  builder: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Respond with a list of commands.'),
  channels: ['bot-cmds'],
  async execute(interaction) {
    const commandsEmbed = new MessageEmbed()
      .setColor('#649CDB')
      .setTitle('Commands')
      .setDescription('Below is a list of all available commands and their descriptions.\n*Members only command\n**Officer only command')
      .setThumbnail('https://i.imgur.com/udziL5c.png')
      .setTimestamp()
    for (const key in commands) {
      if (commands[key].roles && commands[key].roles.includes('Members'))
        commandsEmbed.addField(key, `${commands[key].builder.description}*`)
      else if (commands[key].roles && commands[key].roles.includes('Officers'))
        commandsEmbed.addField(key, `${commands[key].builder.description}**`)
      else
        commandsEmbed.addField(key, commands[key].builder.description)
    }

    await interaction.reply({ embeds: [commandsEmbed] })
  }
}

export default Help
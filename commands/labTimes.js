import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

const labTimesEmbed = new MessageEmbed()
  .setColor('#2ECC71')
  .setTitle('Lab Times')
  .setDescription('Below you can find when our lab will be open. Officers specialties are listed along ' + 
    'with their times.  You are allowed to go to the lab when ever it is open and work on any project ' +
    'you\'d like.\n\nOur lab is located in Research Park: ' + 
    '[3100 Technology Pkwy, Orlando, FL 32826 Partnership II](https://goo.gl/maps/p1Bc37RQEUhHn4U7A)')
  .setThumbnail('https://i.imgur.com/udziL5c.png')
  .addFields(
    { name: 'Datetime', value: 'Monday 2:30-6:30pm', inline: true },
    { name: 'Officer', value: 'Alex', inline: true },
    { name: 'Specialty', value: 'Software', inline: true },

    { name: 'Datetime', value: 'Tuesday 3:45-9:00pm', inline: true },
    { name: 'Officer', value: 'Wes, Vijay, Robert', inline: true },
    { name: 'Specialty', value: 'Computer ENG/ROS/SIM/Software', inline: true },

    { name: 'Datetime', value: 'Wednesday 4:30-9:00pm', inline: true },
    { name: 'Officer', value: 'Dwight', inline: true },
    { name: 'Specialty', value: 'Mech ENG', inline: true },

    { name: 'Datetime', value: 'Thursday 3:45-9:00pm', inline: true },
    { name: 'Officer', value: 'Marc, Robert', inline: true },
    { name: 'Specialty', value: 'Computer ENG/ROS/Mech ENG', inline: true },
  )
  .setTimestamp()

const LabTimes = {
  builder: new SlashCommandBuilder()
    .setName('labtimes')
    .setDescription('Respond with open lab times.'),
  channels: ['bot-cmds'],
  async execute(interaction) {
    await interaction.reply({ embeds: [labTimesEmbed] })
  }
}

export default LabTimes
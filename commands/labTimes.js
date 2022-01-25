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
    { name: 'Datetime', value: 'Monday 5:00-10:00pm', inline: true },
    { name: 'Officer', value: 'Wes, Connor, Dwight', inline: true },
    { name: 'Specialty', value: 'CpE, ME, EE', inline: true },

    { name: 'Datetime', value: 'Tuesday 6:30-10:00pm', inline: true },
    { name: 'Officer', value: 'Marc, Noah', inline: true },
    { name: 'Specialty', value: 'CpE', inline: true },

    { name: 'Datetime', value: 'Wednesday 5:00-10:00pm', inline: true },
    { name: 'Officer', value: 'Peter', inline: true },
    { name: 'Specialty', value: 'CS, ME', inline: true },

    { name: 'Datetime', value: 'Thursday 5:00-10:00pm', inline: true },
    { name: 'Officer', value: 'Dwight, Noah', inline: true },
    { name: 'Specialty', value: 'ME, EE', inline: true },

    { name: 'Datetime', value: 'Friday 6:30-10:00pm', inline: true },
    { name: 'Officer', value: 'Wes, Marc, Vijay', inline: true },
    { name: 'Specialty', value: 'CpE, CS', inline: true },
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

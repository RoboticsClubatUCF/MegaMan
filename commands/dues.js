import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

const url = 'https://www.paypal.com/paypalme/rcucf'

const paymentEmbed = new MessageEmbed()
  .setColor('#FEC904')
  .setURL(url)
  .setAuthor('PayPal', 'https://i.imgur.com/Yg5ZlFc.png', url)
  .setDescription('Dues are to be paid through our PayPal.  All proceeds are used to fund our projects and lab space.')
  .setThumbnail('https://i.imgur.com/udziL5c.png')
  .addFields(
    { name: 'Payment Link', value: url },
    { name: 'Amount', value: '$20.00', inline: true },
    { name: 'Term', value: 'Spring 2022', inline: true }
  )
  .setTimestamp()

const Dues = {
  builder: new SlashCommandBuilder()
    .setName('dues')
    .setDescription('Respond with a link to PayPal to pay dues.'),
  channels: ['bot-cmds'],
  async execute(interaction) {
    await interaction.reply({ embeds: [paymentEmbed] })
  }
}

export default Dues
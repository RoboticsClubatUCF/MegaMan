import axios from 'axios'
import { MessageEmbed } from 'discord.js'

const urlTemplate = 'https://byabbe.se/on-this-day/MONTH/DAY/events.json'

const onThisDayEmbed = new MessageEmbed()
  .setColor('#4990E2')
  .setAuthor('On This Day')
  .setThumbnail('https://i.imgur.com/udziL5c.png')
  .setTimestamp()

const OnThisDay = {
  cronPattern: '* * * * * *',
  channel: 'random',
  async execute(channel) {
    const d = new Date()
    const url = urlTemplate.replace('MONTH', d.getUTCMonth() + 1).replace('DAY', d.getUTCDate())
    const res = await axios.get(url)
  
    if (res.status !== 200) {
      console.error('Error getting on this day.')
      return
    }
  
    // select random event from list
    const event = res.data.events[Math.floor(Math.random() * res.data.events.length)]

    onThisDayEmbed
      .setDescription(event.description)
      .setTitle(`${d.getUTCMonth() + 1}/${d.getUTCDate()}/${event.year}`)

    channel.send({ embeds: [onThisDayEmbed] })
  }
}

export default OnThisDay
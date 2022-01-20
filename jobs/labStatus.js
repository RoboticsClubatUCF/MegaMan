import { config } from 'dotenv'
import status from '../utils/labStatus.js'
import client from '../utils/client.js'

config()

const channel = client.guilds.cache.get(process.env.GUILD_ID).channels.cache
  .find(chan => chan.name.startsWith('Lab Status:'))

const labStatus = {
  cronPattern: '*/10 * * * *', // every 10 minutes
  async execute() {
    const sortedStatus = status.data.sort(function(a, b) {
      const keyA = a.close, keyB = b.close
      if (keyA < keyB) return
      if (keyA > keyB) return -1
      return 0
    })

    if (sortedStatus.length == 0) {
      if (channel.name === 'Lab Status: Closed') return
      else {
        channel.setName('Lab Status: Closed')
        return
      }
    }

    const currentHour = (24 + (new Date().getUTCHours()) - 5) % 24 // current time in est
    if (sortedStatus[0].close <= currentHour) // set lab status to close
      await channel.setName('Lab Status: Closed')
    else // set lab status to open till XX:00
      await channel.setName(`Lab Status: Open till ${zeroPad(sortedStatus[0].close, 2)}:00`)
  }
}

const zeroPad = (num, places) => String(num).padStart(places, '0')

// export default labStatus

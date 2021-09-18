import axios from 'axios'

const urlTemplate = 'https://byabbe.se/on-this-day/MONTH/DAY/events.json'

const Today = async () => {
  const d = new Date()
  const url = urlTemplate.replace('MONTH', d.getUTCMonth() + 1).replace('DAY', d.getUTCDate())
  const res = await axios.get(url)
  console.log(res.data)
}

// export default today
Today()
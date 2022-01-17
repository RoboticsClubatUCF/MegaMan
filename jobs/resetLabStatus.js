import status from '../utils/labStatus.js'

const resetLabStatus = {
  cronPattern: '0 0 * * *', // every day at 00:00
  channel: null,
  async execute(channel) {
    status.data = []
  }
}

export default resetLabStatus

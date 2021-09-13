import Channels from '../utils/channels.js'

const regex = new RegExp(/discord\.gg\//g)

const MessageCreate = {
  name: 'messageCreate',
  async execute(message) {
    // if user posts a discord invite link outside the bulletin-board
    if (message.content.toLowerCase().match(regex) && Object.keys(Channels).find(key => Channels[key].id === message.channel.id) !== 'bulletin-board') {
      await message.delete()
      const dm = await message.author.createDM()
      await dm.send(`Message content \`${message.content}\` not allowed outside of the bulletin-board.`)
    }
  }
}

export default MessageCreate
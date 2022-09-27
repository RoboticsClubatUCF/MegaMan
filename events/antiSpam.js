const memberMessages = {}

const AntiSpam = {
  name: 'messageCreate',
  async execute(message) {
    if (!message.content) return

    const mId = message.author.id

    if (mId in memberMessages) {
      if (memberMessages[mId].lastMessage === message.content) {
        if (memberMessages[mId].repetition >= 2) {
          await message.delete()
          await message.author.send('You have sent the same message too frequently, please do not spam.')
          const officersChannel = await message.guild.channels.cache.find(c => c.name === 'officers')
          await officersChannel.send(`<@${mId}> warned for spamming message \`\`\`${message.content}\`\`\` in <#${message.channelId}>`)
        } else memberMessages[mId].repetition++
      } else {
        memberMessages[mId] = {
          lastMessage: message.content,
          repetition: 1
        }
      }
    } else {
      memberMessages[mId] = {
        lastMessage: message.content,
        repetition: 1
      }
    }
  }
}

export default AntiSpam

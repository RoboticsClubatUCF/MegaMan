let Channels = {}

export const populateChannels = async (channels) => {
  channels.each(c => Channels[c.name] = c)
}

export default Channels
import { config } from 'dotenv'
import getCommands from '../utils/getCommands.js'
import { populateRoles } from '../utils/roles.js'
import { populateChannels } from '../utils/channels.js'

config()

const Ready = {
  name: 'ready',
  once: true,
  async execute(client) {
    if (!client.application?.owner) await client.application?.fetch()

    const guild = await client.guilds.cache.get(process.env.GUILD_ID)

    const commands = await getCommands()
    const guildCommands = await guild.commands.fetch()
    const guildRoles = await guild.roles.cache
    const guildChannels = await guild.channels.cache

    // populate roles
    await populateRoles(guildRoles)

    // populate channels
    await populateChannels(guildChannels)

    // correct command permissions
    for (const cmd of guildCommands) {
      if (commands[cmd[1].name].roles) {
        const permissions = []
        for (const r of commands[cmd[1].name].roles) {
          const role = await guildRoles.find(role => role.name === r)
          permissions.push({
            id: role.id,
            type: 'ROLE',
            permission: true
          })
        }

        await cmd[1].permissions.add({ permissions })
      }
    }

    console.log(`Ready! Logged in as ${client.user.tag}`)
  }
}

export default Ready
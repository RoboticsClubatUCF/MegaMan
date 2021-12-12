import { config } from 'dotenv'
import getCommands from '../utils/getCommands.js'
import StartJobs from '../utils/startJobs.js'

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

    // correct command permissions
    for (const cmd of guildCommands) {
      const permissions = []
      if (commands[cmd[1].name].roles) {
        for (const r of commands[cmd[1].name].roles) {
          const role = await guildRoles.find(role => role.name === r)
          permissions.push({
            id: role.id,
            type: 'ROLE',
            permission: true
          })
        }
      }
      if (commands[cmd[1].name].members) {
        for (const m of commands[cmd[1].name].members) {
          permissions.push({
            id: m,
            type: 'USER',
            permission: true
          })
        }
      }
      await cmd[1].permissions.add({ permissions })
    }

    // start jobs
    await StartJobs(guild)

    client.user.setActivity('/help', { type: 'LISTENING' })

    console.log(`Ready! Logged in as ${client.user.tag}`)
  }
}

export default Ready

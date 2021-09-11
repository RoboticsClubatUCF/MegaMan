import fs from 'fs'
import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

config()

const getCommands = async () => {
  const commands = {}
  const commandFiles = fs.readdirSync(`${__dirname}/../commands`).filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = await import(`${__dirname}/../commands/${file}`)
    commands[command.default.builder.name] = command.default
  }
  return commands
}

const Ready = {
  name: 'ready',
  once: true,
  async execute(client) {
    if (!client.application?.owner) await client.application?.fetch()

    const guild = await client.guilds.cache.get(process.env.GUILD_ID)

    const commands = await getCommands()
    const guildCommands = await guild.commands.fetch()
    const guildRoles = await guild.roles.cache

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
import fs from 'fs'
import { config } from 'dotenv'
import { Client, Collection, Intents } from 'discord.js'

// load envs
config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] })

// setup slash commands
client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`)
  client.commands.set(command.default.builder.name, command.default)
}

// setup events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
for (const file of eventFiles) {
  const event = await import(`./events/${file}`)
  if (event.default.once) client.once(event.default.name, (...args) => event.default.execute(...args))
  else client.on(event.default.name, (...args) => event.default.execute(...args))
}

client.login(process.env.TOKEN)

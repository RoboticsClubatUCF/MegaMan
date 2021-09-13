import fs from 'fs'
import { config } from 'dotenv'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'

config()

const gatherCommands = async () => {
  const commands = []
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = await import(`./commands/${file}`)
    commands.push(command.default.builder.toJSON())
  }
  return commands
}

(async () => {
  const commands = await gatherCommands()
  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    )

    console.log('Successfully registered application commands.')
  } catch (error) {
    console.error(error)
  }
})()

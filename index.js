import fs from 'fs'
import { config } from 'dotenv'
import { Client, Collection, Intents } from 'discord.js'

// load envs
config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

// setup slash commands
client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`)
	client.commands.set(command.default.builder.name, command.default)
}

client.once('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

	const command = client.commands.get(interaction.commandName)

	if (!command) return

	try {
		await command.execute(interaction)
	} catch (error) {
		console.error(error)
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
	}
})

client.login(process.env.TOKEN)

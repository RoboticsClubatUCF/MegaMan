import { SlashCommandBuilder } from '@discordjs/builders'

const Dues = {
  builder: new SlashCommandBuilder()
    .setName('dues')
    .setDescription('Respond with a link to PayPal to pay dues'),
  async execute(interaction) {
      
    // TODO add relevant paypal url
    // 7 seconds? too long? too short?
    await interaction.reply({
        content: 'http://paypal.com',
        ephemeral: true
    });

  }
}

export default Dues
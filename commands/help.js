import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

const Help = {
  builder: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Respond with a list of commands."),
  channels: ["bot-cmds"],
  async execute(interaction) {
    const commandsEmbed = new MessageEmbed()
      .setColor("#649CDB")
      .setTitle("Commands")
      .setDescription(
        "Below is a list of all available commands and their descriptions.\n*Members only command\n**Officer only command",
      )
      .setThumbnail("https://i.imgur.com/udziL5c.png")
      .setTimestamp();

    for (const [key, cmd] of interaction.client.commands) {
      if (cmd.members) continue;

      if (cmd.roles && cmd.roles.includes("Members"))
        commandsEmbed.addField(key, `${cmd.builder.description}*`);
      else if (cmd.roles && cmd.roles.includes("Officers"))
        commandsEmbed.addField(key, `${cmd.builder.description}**`);
      else commandsEmbed.addField(key, cmd.builder.description);
    }

    await interaction.reply({ embeds: [commandsEmbed] });
  },
};

export default Help;

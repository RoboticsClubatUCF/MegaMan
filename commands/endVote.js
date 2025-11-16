import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import voteManager from "../utils/voteManager.js";

const VOTING_CHANNEL_ID = "1030260673961275473";

const EndElection = {
  builder: new SlashCommandBuilder()
    .setName("endelection")
    .setDescription("End the current election and declare the winner.")
    .setDefaultPermission(false),
  
  // Restriction configuration
  channels: [],
  roles: ["Officers"],
  
  async execute(interaction) {
    // Enforce channel ID check
    if (interaction.channel.id !== VOTING_CHANNEL_ID) {
      return await interaction.reply({
        content: `❌ This command can only be used in the designated voting channel.`,
        ephemeral: true,
      });
    }

    // Verify there's an active election
    if (!voteManager.hasActiveVote(VOTING_CHANNEL_ID)) {
      return await interaction.reply({
        content: "❌ No active election to end.",
        ephemeral: true,
      });
    }

    // Get and end the election
    const results = voteManager.endVote(VOTING_CHANNEL_ID);

    // Find winner(s)
    const maxVotes = Math.max(...results.results.map(r => r.count));
    const winners = results.results.filter(r => r.count === maxVotes);

    // Build results embed
    const resultsEmbed = new MessageEmbed()
      .setColor("#FEC904")
      .setTitle("📊 ELECTION RESULTS")
      .setDescription(`**Position:** ${results.question}\n**Total Votes Cast:** ${results.totalVotes}`)
      .setTimestamp();

    // Add results for each candidate with a visual bar
    results.results.forEach(candidate => {
      const barLength = Math.round(parseFloat(candidate.percentage) / 5);
      const bar = barLength > 0 ? "█".repeat(barLength) : "░";
      resultsEmbed.addField(
        candidate.label,
        `${bar} ${candidate.count} votes (${candidate.percentage}%)`,
        false
      );
    });

    // Announce winner
    const winnerText = winners.length === 1
      ? `🏆 **ELECTED:** ${winners[0].label} with ${winners[0].count} votes (${winners[0].percentage}%)`
      : `🏆 **TIE!** ${winners.map(w => w.label).join(", ")} with ${winners[0].count} votes each (${winners[0].percentage}%)`;
    
    resultsEmbed.addField("\u200B", winnerText);

    // Send results publicly
    await interaction.reply({ embeds: [resultsEmbed] });
  },
};

export default EndElection;
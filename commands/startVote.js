import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageSelectMenu } from "discord.js";
import voteManager from "../utils/voteManager.js";

const VOTING_CHANNEL_ID = "1030260673961275473";

const StartElection = {
  builder: new SlashCommandBuilder()
    .setName("startelection")
    .setDescription("Start an anonymous election in the voting channel.")
    .addStringOption(option => 
      option.setName("position")
        .setDescription("The position being voted on (e.g., President, Treasurer)")
        .setRequired(true))
    .addStringOption(option => 
      option.setName("candidates")
        .setDescription("Comma-separated list of candidate names (e.g., 'Alice Smith, Bob Johnson, Charlie Brown')")
        .setRequired(true))
    .setDefaultPermission(false),
  
  // Restriction configuration
  channels: [], // Using ID-based check instead
  roles: ["Officers"],
  
  async execute(interaction) {
    // Enforce channel ID check
    if (interaction.channel.id !== VOTING_CHANNEL_ID) {
      return await interaction.reply({
        content: `❌ This command can only be used in the designated voting channel.`,
        ephemeral: true,
      });
    }

    // Check for existing active vote
    if (voteManager.hasActiveVote(VOTING_CHANNEL_ID)) {
      return await interaction.reply({
        content: "❌ There's already an active election. Use `/endelection` to end it first.",
        ephemeral: true,
      });
    }

    // Parse and validate inputs
    const position = interaction.options.getString("position");
    const candidatesString = interaction.options.getString("candidates");
    const candidates = candidatesString.split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (candidates.length < 2) {
      return await interaction.reply({
        content: "❌ Please provide at least 2 candidates separated by commas.",
        ephemeral: true,
      });
    }
    
    if (candidates.length > 25) {
      return await interaction.reply({
        content: "❌ A maximum of 25 candidates is allowed.",
        ephemeral: true,
      });
    }

    // Create the election
    const voteData = voteManager.createVote(VOTING_CHANNEL_ID, position, candidates);

    // Build the select menu
    const selectMenu = new MessageSelectMenu()
      .setCustomId("election_select")
      .setPlaceholder("Cast your anonymous vote")
      .setMaxValues(1)
      .addOptions(voteData.options.map(opt => ({
        label: opt.label,
        description: `Vote for ${opt.label}`,
        value: opt.value
      })));

    const row = new MessageActionRow().addComponents(selectMenu);

    // Send the election interface
    await interaction.reply({
      content: `🗳️ **ELECTION FOR: ${position.toUpperCase()}**\n\n**Candidates:** ${candidates.join(", ")}\n\n*Select your choice from the menu below. Your vote is anonymous and results are hidden until the election ends.*`,
      components: [row],
      ephemeral: false,
    });
  },

  // Handler for when users select a candidate
  async onSelect(interaction) {
    // Verify this is the voting channel
    if (interaction.channel.id !== VOTING_CHANNEL_ID) {
      return await interaction.reply({
        content: "❌ Voting is not allowed in this channel.",
        ephemeral: true,
      });
    }

    // Check if user has Member role
    const memberRole = interaction.guild.roles.cache.find(r => r.name === "Members");
    if (!memberRole) {
      return await interaction.reply({
        content: "❌ Members role not found. Contact an admin.",
        ephemeral: true,
      });
    }
    
    if (!interaction.member.roles.cache.has(memberRole.id)) {
      return await interaction.reply({
        content: "❌ You must have the `Members` role to vote in elections.",
        ephemeral: true,
      });
    }

    const voteData = voteManager.activeVotes.get(VOTING_CHANNEL_ID);
    if (!voteData) {
      return await interaction.reply({
        content: "❌ No active election found.",
        ephemeral: true,
      });
    }

    const selectedValue = interaction.values[0];
    const userId = interaction.user.id;

    // Record the vote (handles changing votes)
    const success = voteManager.recordVote(VOTING_CHANNEL_ID, userId, selectedValue);
    if (!success) {
      return await interaction.reply({
        content: "❌ Failed to record your vote.",
        ephemeral: true,
      });
    }

    // Confirm to the user
    const selectedLabel = voteData.options.find(opt => opt.value === selectedValue).label;
    await interaction.reply({
      content: `✅ Your vote for "${selectedLabel}" has been recorded anonymously. You can change your vote by selecting a different candidate before the election ends.`,
      ephemeral: true,
    });
  },
};

export default StartElection;
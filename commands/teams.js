import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageSelectMenu } from "discord.js";

const options = [
  {
    label: "Project S.T.O.R.M.",
    description: "The Surface Terrain Operations Rover for Mars(S.T.O.R.M.) Team",
    value: "projectStorm",
  },
  {
    label: "Knightmare Robotics",
    description: "The Knightmare (VEXU) Team",
    value: "knightmare",
  },
  {
    label: "Sumobots",
    description: "The sumobots Team",
    value: "sumo",
  },
  {
    label: "TapeMeasure",
    description: "The Tape Measure Team",
    value: "tape",
  },
  {
    label: "Pep25",
    description: "The Boat Team",
    value: "boat",
  },
  {
    label: "Web Dev",
    description: "The Web Dev Team",
    value: "web_dev",
  },
  {
    label: "Day Dream",
    description: "The Day Dream (VEXU) Team",
    value: "day_dream",
  },
];

const rolesMap = {
  projectStorm: "🌩Project S.T.O.R.M.",
  knightmare: "Knightmare Robotics",
  sumo: "Sumobots",
  tape: "TapeMeasure Team",
  boat: "BOAT Team",
  web_dev: "Web Dev",
  day_dream: "Day Dream",
};

const rolesSet = new Set(Object.keys(rolesMap));

/**
 * UCF semester start dates (adjust yearly as needed)
 * Fall: usually late August
 * Spring: usually early January
 */
const semesterStartDates = {
  spring: new Date(new Date().getFullYear(), 0, 6),   // Jan 6 this year
  fall: new Date(new Date().getFullYear(), 7, 26),    // Aug 26 this year
};

function isWithin3WeeksOfSemesterStart(now = new Date()) {
  const THREE_WEEKS_MS = 21 * 24 * 60 * 60 * 1000;

  for (const sem of Object.values(semesterStartDates)) {
    const start = new Date(sem);
    const diff = now - start;
    if (diff >= 0 && diff <= THREE_WEEKS_MS) {
      return true; // inside 3-week open window
    }
  }
  return false;
}

const Team = {
  builder: new SlashCommandBuilder()
    .setName("teams")
    .setDescription("Join Teams of The Robotics Club.")
    .setDefaultPermission(false),
  channels: ["bot-cmds"],
  roles: [], // we dynamically check role requirement now
  async execute(interaction) {
    const now = new Date();

    // only allow free access if inside 3 weeks after semester start
    // otherwise require "Members" role
    if (!isWithin3WeeksOfSemesterStart(now)) {
      const memberRole = interaction.guild.roles.cache.find(r => r.name === "Members");
      if (!interaction.member.roles.cache.has(memberRole?.id)) {
        return await interaction.reply({
          content: "❌ You must have the `Members` role to use this command after the 3-week open period.",
          ephemeral: true,
        });
      }
    }

    if (!this.channels.includes(interaction.channel.name)) {
      return await interaction.reply({
        content: "❌ This command can only be used in #bot-cmds.",
        ephemeral: true,
      });
    }

    const roles = interaction.guild.roles.cache;
    const memberOptions = options;

    for (const option of memberOptions) {
      const role = roles.find((role) => role.name === rolesMap[option.value]);
      option["default"] = false;
      if (interaction.member.roles.resolve(role.id)) option["default"] = true;
    }

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("team")
        .setPlaceholder("Select teams or projects to join.")
        .setMaxValues(memberOptions.length)
        .addOptions(memberOptions),
    );

    await interaction.reply({
      content: "Select Team(s) to join.",
      components: [row],
      ephemeral: true,
    });
  },
  async onSelect(interaction) {
    const roles = interaction.guild.roles.cache;
    const valueSet = new Set(interaction.values);
    const notSelected = new Set([...rolesSet].filter((x) => !valueSet.has(x)));

    // roles to add
    valueSet.forEach(async (v) => {
      const role = roles.find((role) => role.name === rolesMap[v]);
      await interaction.member.roles.add(role);
    });

    // roles to remove
    notSelected.forEach(async (v) => {
      const role = roles.find((role) => role.name === rolesMap[v]);
      await interaction.member.roles.remove(role);
    });

    const teamsToDisplay = interaction.values.map((teamKey) => rolesMap[teamKey]).join(", ");

    await interaction.update({
      content: `✅ You are now part of team(s): ${teamsToDisplay}.`,
      components: [],
      ephemeral: true,
    });
    await interaction.channel.send(
      `**${interaction.member.displayName}** is now part of team(s): ${teamsToDisplay}.`,
    );
  },
};

export default Team;

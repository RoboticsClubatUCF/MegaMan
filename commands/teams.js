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
  day_dream: "Day Dream"
};

const rolesSet = new Set(Object.keys(rolesMap));

const Team = {
  builder: new SlashCommandBuilder()
    .setName("teams")
    .setDescription("Join Teams of The Robotics Club.")
    .setDefaultPermission(false),
  channels: ["bot-cmds"],
  roles: ["Members"],
  async execute(interaction) {
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

    const teamsToDisplay = interaction.values.map((teamKey)=> rolesMap[teamKey]).join(", ")

    await interaction.update({
      content: `You is now part of team(s): ${teamsToDisplay}.`,
      components: [],
      ephemeral: true,
    });
    await interaction.channel.send(
      `**${
        interaction.member.displayName
      }** is now part of team(s): ${teamsToDisplay}.`,
    );
  },
};

export default Team;

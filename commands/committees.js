import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageSelectMenu } from "discord.js";

const options = [
    {
        label: "The Outreach Committee",
        description: "Outreach Committee",
        value: "outreachcommittee",
      },
    {
        label: "The Lab Management/Infrastructure Committee",
        description: "Lab Management/Infrastructure Committee",
        value: 'labmanagement',
      }, 
];

const rolesMap = {
    outreachcommittee: "Outreach Committee",
    labmanagement: "Lab Improvement/Infrastructure committee"
  };

  const rolesSet = new Set(Object.keys(rolesMap));

  const Team = {
    builder: new SlashCommandBuilder()
      .setName("Committee's")
      .setDescription("Join Committee's of The Robotics Club.")
      .setDefaultPermission(false),
    channels: ["bot-cmds"],
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
          .setCustomId("Committee's")
          .setPlaceholder("Select Committee's to join.")
          .setMaxValues(memberOptions.length)
          .addOptions(memberOptions),
      );
  
      await interaction.reply({
        content: "Select Committee(s) to join.",
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
  
      await interaction.update({
        content: `You is now part of Committee(s): ${interaction.values.join(", ")}.`,
        components: [],
        ephemeral: true,
      });
      await interaction.channel.send(
        `**${
          interaction.member.displayName
        }** is now part of Committee(s): ${interaction.values.join(", ")}.`,
      );
    },
  };
  
  export default Team;
  
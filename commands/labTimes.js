import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

const labTimesEmbed = new MessageEmbed()
  .setColor("#2ECC71")
  .setTitle("Lab Times")
  .setDescription(
    "Below you can find when our lab will be open. Officer/TLs specialties are listed along " +
      "with their times.  You are allowed to go to the lab when ever it is open and work on any project " +
      "you'd like.\n\nOur lab is located in Research Park: " +
      "[3100 Technology Pkwy, Orlando, FL 32826 Partnership II](https://goo.gl/maps/p1Bc37RQEUhHn4U7A)",
  )
  .setThumbnail("https://i.imgur.com/udziL5c.png")
  .addFields(
    { name: "Datetime", value: "Monday 6PM", inline: true },
    { name: "Officer/TL", value: "Sam, Lee", inline: true },
    { name: "Projects", value: "Garduino, Lunabotics", inline: true },

    { name: "Datetime", value: "Tuesday 6PM", inline: true },
    {
      name: "Officer/TL",
      value: "Gianni, Quinn, Caden, Peter, Dwight",
      inline: true,
    },
    { name: "Projects", value: "ARM, DAWG, DOG", inline: true },

    { name: "Datetime", value: "Wednesday 6PM", inline: true },
    { name: "Officer/TL", value: "Marc, Dwight, Peter, Hannah", inline: true },
    { name: "Projects", value: "AGV", inline: true },

    { name: "Datetime", value: "Thursday 6PM", inline: true },
    { name: "Officer/TL", value: "Sam, Gianni", inline: true },
    { name: "Projects", value: "SUMO", inline: true },

    { name: "Datetime", value: "Friday", inline: true },
    { name: "Officer/TL", value: "-", inline: true },
    { name: "Projects", value: "(Open Lab)", inline: true },

    { name: "Datetime", value: "Saturday", inline: true },
    { name: "Officer/TL", value: "Tevin", inline: true },
    { name: "Projects", value: "BOAT", inline: true },
  )
  .setTimestamp();

const LabTimes = {
  builder: new SlashCommandBuilder()
    .setName("labtimes")
    .setDescription("Respond with open lab times."),
  channels: ["bot-cmds"],
  async execute(interaction) {
    await interaction.reply({ embeds: [labTimesEmbed] });
  },
};

export default LabTimes;

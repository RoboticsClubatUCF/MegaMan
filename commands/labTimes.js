import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

const labTimesEmbed = new MessageEmbed()
  .setColor("#2ECC71")
  .setTitle("Lab Times")
  .setDescription(
    "Below you can find when our lab will be open. Officer/TLs specialties are listed along " +
      "with their times.  You are allowed to go to the lab when ever it is open and work on any project " +
      "you'd like.\n\nOur lab is located in Research Park: " +
      "[3100 Technology Pkwy, Orlando, FL 32826 Partnership II](https://goo.gl/maps/p1Bc37RQEUhHn4U7A)"
  )
  .setThumbnail("https://i.imgur.com/udziL5c.png")
  .addFields(
    { name: "Datetime", value: "Monday 5-10PM", inline: true },
    { name: "Officer/TL", value: "Vijay, Tevin", inline: true },
    { name: "Projects", value: "Wall Climber", inline: true },

    { name: "Datetime", value: "Tuesday 6-10PM", inline: true },
    { name: "Officer/TL", value: "Marc, Dwight, Connor, Peter, Gianni", inline: true },
    { name: "Projects", value: "AGV", inline: true },

    { name: "Datetime", value: "Wednesday 6-10PM", inline: true },
    { name: "Officer/TL", value: "Peter, Noah, Ruigi, Gianni", inline: true },
    { name: "Projects", value: "Musicbot, Sumobot", inline: true },

    { name: "Datetime", value: "Thursday 6-10PM", inline: true },
    { name: "Officer/TL", value: "Kate, Aiden, Maddie, Bradley", inline: true },
    { name: "Projects", value: "Lunar Knights, Garduino", inline: true },

    { name: "Datetime", value: "Friday 6-10PM", inline: true },
    { name: "Officer/TL", value: "-", inline: true },
    { name: "Projects", value: "(Free Day)", inline: true }
  )
  .setTimestamp();

const LabTimes = {
  builder: new SlashCommandBuilder()
    .setName("labtimes")
    .setDescription("Respond with open lab times."),
  channels: ["bot-cmds"],
  async execute(interaction) {
    await interaction.reply({ embeds: [labTimesEmbed] });
  }
}

export default LabTimes;

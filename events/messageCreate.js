import Channels from "../utils/channels.js";

const regex = new RegExp(/discord\.gg\//g);

const MessageCreate = {
  name: "messageCreate",
  async execute(message) {
    const m = await message.guild.members.fetch(message.author.id);

    // if user posts a discord invite link outside the bulletin-board
    if (
      message.content.toLowerCase().match(regex) &&
      Object.keys(Channels).find(
        (key) => Channels[key].id === message.channel.id,
      ) !== "bulletin-board" &&
      !m.roles.cache.some(
        (r) => r.name === "Officers" || r.name === "Team Leads",
      )
    ) {
      await message.delete();
      const dm = await message.author.createDM();
      await dm.send(
        `Message content \`${message.content}\` not allowed outside of the bulletin-board because it contains \`discord.gg/\`.`,
      );
    }
  },
};

export default MessageCreate;

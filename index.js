import fs from "fs";
import { config } from "dotenv";
import { Collection } from "discord.js";
import client from "./utils/client.js";
import checkForRoleUpdates from "./jobs/checkRoleUpdates.js";

// load envs
config();

const setupCommands = async () => {
  client.commands = new Collection();
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    client.commands.set(command.default.builder.name, command.default);
  }
};

const setupEvents = async () => {
  const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));
  for (const file of eventFiles) {
    const event = await import(`./events/${file}`);
    if (event.default.once)
      client.once(event.default.name, (...args) =>
        event.default.execute(...args),
      );
    else
      client.on(event.default.name, (...args) =>
        event.default.execute(...args),
      );
  }
};

setupCommands();
setupEvents();

await client.login(process.env.TOKEN);
checkForRoleUpdates.execute();

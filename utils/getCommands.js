import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getCommands = async () => {
  const commands = {};
  const commandFiles = fs
    .readdirSync(`${__dirname}/../commands`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = await import(`${__dirname}/../commands/${file}`);
    commands[command.default.builder.name] = command.default;
  }
  return commands;
};

export default getCommands;

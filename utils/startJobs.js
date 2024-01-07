import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CronJob } from "cron";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const StartJobs = async (guild) => {
  const jobFiles = fs
    .readdirSync(`${__dirname}/../jobs`)
    .filter((file) => file.endsWith(".js"));
  for (const file of jobFiles) {
    const event = await import(`${__dirname}/../jobs/${file}`);
    const channel = await guild.channels.cache.find(
      (chan) => chan.name === event.default.channel,
    );
    const job = new CronJob(
      event.default.cronPattern,
      async () => await event.default.execute(channel),
      null,
      false,
      "America/New_York",
    );
    job.start();
  }
};

export default StartJobs;

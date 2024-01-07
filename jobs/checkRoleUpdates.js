import { config } from "dotenv";

config();

const checkForRoleUpdates = {
  cronPattern: "*/15 * * * *", // every 10 minutes
  async execute() {
    const users = JSON.parse(new TextDecoder().decode((await (await fetch("https://rccf.club/api/members",{})).body.getReader().read()).value))
  },
};


export default checkForRoleUpdates;
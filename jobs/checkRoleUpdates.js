import { config } from "dotenv";
import client from "../utils/client.js";
config();
/////////
const checkForRoleUpdates = {
  cronPattern: "*/30 * * * *", // every 30 minutes
  async execute() {
    console.log("calling the api");

    const users = JSON.parse(
      new TextDecoder().decode(
        (
          await (await fetch("https://rccf.club/api/members", {})).body
            .getReader()
            .read()
        ).value,
      ),
    );
    /*
    Data should come in as a string[]
    */
    console.log(users);

    const guilds = await client.guilds.fetch();
    for (const g of guilds) {
      if (g[1].id === "267370501280759810") {
        const guild = await g[1].fetch();
        const role = await guild.roles.fetch("267373066290593794");
        const members = await guild.members.fetch();
        for (const m of members) {
          if (
            users.includes(m[1].user.username) ||
            users.includes(m[1].nickname) ||
            users.includes(m[1].displayName)
          ) {
            if (
              !m[1].roles
                .valueOf()
                .find(async (r) => r.id === "267373066290593794")
            ) {
              await m[1].roles.add(role);
            }
          } else {
            try {
              // only try to remove a role if they have it
              m[1].roles.valueOf().find(async (r) => {
                if (r.id == "267373066290593794") {
                  await m[1].roles.remove(role);
                  return true;
                }
              });
            } catch (ex) {}
          }
        }
      }
    }
  },
};

export default checkForRoleUpdates;

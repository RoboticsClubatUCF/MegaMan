import { config } from "dotenv";
import client from "../utils/client.js";
config();

const checkForRoleUpdates = {
  cronPattern: "*/15 * * * *", // every 10 minutes
  async execute() {
    const users = JSON.parse(new TextDecoder().decode((await (await fetch("https://rccf.club/api/members",{})).body.getReader().read()).value))
    /*
    Data should come in as a {discordProfileName:string}[]
    */

    const guilds = await client.guilds.fetch();
    for (const g of guilds) {
      if (g[1].id === '267370501280759810') {
        const guild = await g[1].fetch();
        const role = await guild.roles.fetch(
          (role) => role.name === "Members",
        );
        const members = await guild.members.fetch();
        for (const m of members) {
          if(users.includes(m[1].user.username)){
            m[1].roles.add(role)
          }else {
            try {
              m[1].roles.remove(role)
            }catch (ex){
            }
          }
        }
      }
    }
  },
};


export default checkForRoleUpdates;

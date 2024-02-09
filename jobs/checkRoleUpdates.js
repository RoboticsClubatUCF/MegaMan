import { config } from "dotenv";
import client from "../utils/client.js";
config();
/////////
const checkForRoleUpdates = {
  cronPattern: "*/30 * * * *", // every 30 minutes
  async execute() {
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
    // users is an array containing every person who has paid dues on the website
    // console.log(users);

    const guild = await client.guilds.fetch("267370501280759810");
    const role = await guild.roles.fetch("267373066290593794");
    const members = await guild.members.fetch();
    for (const m of members) {
      // console.log(users.filter((u)=>{
      //   return u.toLowerCase() == m[1].user.username.toLowerCase()
      // }))
      if (
        users.includes(m[1].user.username) ||
        users.includes(m[1].nickname) ||
        users.includes(m[1].displayName)
      ) {
        if (!(m[1].roles.resolve("267373066290593794")?.id ? true : false)) {
          console.log("giving role to => " + m[1].user.username);
          await m[1].roles.add(role);
        }
      } else {
        try {
          // only try to remove a role if they have it
          if (m[1].roles.resolve("267373066290593794")?.id ? true : false) {
            console.log("removing role from => " + m[1].user.username);
            await m[1].roles.remove(role);
          }
        } catch (ex) {}
      }
    }
  },
};

export default checkForRoleUpdates;

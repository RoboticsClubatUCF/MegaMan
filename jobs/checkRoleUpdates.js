import { config } from "dotenv";
import client from "../utils/client.js";
config();
/////////
const checkForRoleUpdates = {
  cronPattern: "*/1 * * * *", // every 1 minutes
  async execute() {   
    console.log("calling the api")

    const users = JSON.parse(new TextDecoder().decode((await (await fetch("https://rccf.club/api/members",{})).body.getReader().read()).value))
    /*
    Data should come in as a string[]
    */
   console.log(users);

    const guilds = await client.guilds.fetch();
    for (const g of guilds) {
      if (g[1].id === '267370501280759810') {
        console.log("found guild")
        const guild = await g[1].fetch();
        console.log("fetch guild")
        const role = await guild.roles.fetch("267373066290593794")
        console.log("fetch role")
        const members = await guild.members.fetch();
        console.log(members)
        for (const m of members) {
          console.log("checking : " + m[1].user.username)
          if(users.includes(m[1].user.username)){
            console.log("found : " + m[1].user.username)
            m[1].roles.add(role)
            console.log("updated : " + m[1].user.username)
          }else {
            try {
              console.log("trying to remove : " + m[1].user.username)
              m[1].roles.remove(role)
              console.log("removed : " + m[1].user.username)
            }catch (ex){
            }
          }
        }
      }
    }
  },
};


export default checkForRoleUpdates;

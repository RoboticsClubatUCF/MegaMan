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
        const guild = await g[1].fetch();
        const role = await guild.roles.fetch("267373066290593794")
        const members = await guild.members.fetch();
        console.log("members: " + members.size)
        for (const m of members) {
          for (let i = 0; i < users.length; i++) {
            console.log("check " + users[i] + " against " + m[1].user.username)
            if(users[i] == m[1].user.username){
              console.log("found : " + m[1].user.username)
              // await m[1].roles.add(role)
              console.log("updated : " + (await m[1].roles.add(role)).user.username)
            }else {
              try {
                console.log("trying to remove : " + m[1].user.username)
                console.log("updated : " + (await m[1].roles.remove(role)).user.username)
              }catch (ex){
              }
            }
          }
        }
      }
    }
  },
};


export default checkForRoleUpdates;

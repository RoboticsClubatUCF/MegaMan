const googleDoc = 'https://forms.gle/R6MGxEWSGqVEYxdF9'

const teamLeadForm = {
  cronPattern: '0 20 * * 4', // every thursday at 20:00
  channel: 'teamleads',
  async execute(channel) {
    const role = channel.guild.roles.cache.find(r => r.name === 'Team Leads')
    await channel.send(`<@${role.id}>, if you have not already, please fill out this form regarding this week's project meeting. The information obtained from this form allows us to find and solve issues within teams, offer help where needed, as well as establish trends that aid in future project development.\n${googleDoc}`)
  }
}

export default teamLeadForm

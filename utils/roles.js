let Roles = {}

export const populateRoles = async (roles) => {
  roles.each(r => Roles[r.name] = r)
}

export default Roles
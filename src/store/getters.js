export const getters = {
  getDispatchedTeamsForTeamProjectList (state) {
    return state.dispatchedTeamsForTeamProjectList
  },
  getDispatchedProjectsForTeamProjectList (state) {
    return state.dispatchedProjectsForTeamProjectList
  },
  getAirtableProjects (state) {
    return state.airtableProjects
  },
  getAirtableDepartments (state) {
    return state.airtableDepartments
  },
  getAirtableTeams (state) {
    return state.airtableTeams
  },
  appTitle (state) {
    return state.appTitle
  },
  getUser (state) {
    return state.user
  },
  getError (state) {
    return state.error
  },
  getLoading (state) {
    return state.loading
  }
}

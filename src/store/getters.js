export const getters = {
  getDispatchedTeamsForTeamProjectList (state) {
    return state.dispatchedTeamsForTeamProjectList
  },
  getDispatchedProjectsForTeamProjectList (state) {
    return state.dispatchedProjectsForTeamProjectList
  },
  getDispatchedStatuses (state) {
    return state.dispatchedStatuses
  },
  getDispatchedProjects (state) {
    return state.dispatchedProjects
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
  getAirtableStatuses (state) {
    return state.airtableStatuses
  },
  getAirtableTasks (state) {
    return state.airtableTasks
  },
  getAirtableProjectFilter (state) {
    return state.airtableProjectFilter
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
  },
  getSnackbar (state) {
    return state.snackbar
  }
}

export const mutations = {
  setSnackbar (state, payload) {
    state.snackbar = payload
  },
  setAirtableProjects (state, payload) {
    state.airtableProjects = payload
  },
  setAirtableDepartments (state, payload) {
    state.airtableDepartments = payload
  },
  setAirtableTeams (state, payload) {
    state.airtableTeams = payload
  },
  setAirtableStatuses (state, payload) {
    state.airtableStatuses = payload
  },
  setAirtableTasks (state, payload) {
    state.airtableTasks = payload
  },
  setAirtablePhases (state, payload) {
    state.airtablePhases = payload
  },
  setAirtableProjectFilter (state, payload) {
    state.airtableProjectFilter = payload
  },
  setDispatchedStatuses (state, payload) {
    state.dispatchedStatuses = payload
  },
  setDispatchedProjects (state, payload) {
    state.dispatchedProjects = payload
  },
  setDispatchedTeamsForTeamProjectList (state, payload) {
    state.dispatchedTeamsForTeamProjectList = payload
  },
  setDispatchedProjectsForTeamProjectList (state, payload) {
    state.dispatchedProjectsForTeamProjectList = payload
  },
  setUser (state, payload) {
    state.user = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  }
}

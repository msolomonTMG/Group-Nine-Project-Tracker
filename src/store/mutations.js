export const mutations = {
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
  setDispatchedStatuses (state, payload) {
    state.dispatchedStatuses = payload
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

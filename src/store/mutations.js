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
  },
  setUserPosts (state, payload) {
    state.userPosts = payload
  },
  setAllPatients (state, payload) {
    state.patients = payload
  },
  setGame (state, payload) {
    state.game = payload
  }
}

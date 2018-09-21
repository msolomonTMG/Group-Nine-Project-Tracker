import firebase from 'firebase'
import Airtable from 'airtable'
import { airtableConfig } from '../config'
import router from '@/router'

let airtableBase = new Airtable({apiKey: airtableConfig.apiKey}).base(airtableConfig.base)

export const actions = {
  setDispatchedTeamsForTeamProjectList ({commit}, payload) {
    return commit('setDispatchedTeamsForTeamProjectList', payload)
  },
  setDispatchedProjectsForTeamProjectList ({commit}, payload) {
    return commit('setDispatchedProjectsForTeamProjectList', payload)
  },
  setDispatchedStatuses ({commit}, payload) {
    return commit('setDispatchedStatuses', payload)
  },
  setAirtableProjects ({commit}, payload) {
    let projects = []
    airtableBase('Projects').select({
      view: 'All Projects'
    }).eachPage(function page (records, fetchNextPage) {
      records.forEach(record => {
        projects.push(record)
      })
      fetchNextPage()
    }, function done (err) {
      if (err) { console.error(err); return }
      return commit('setAirtableProjects', projects)
    })
  },
  setAirtableDepartments ({commit}, payload) {
    let departments = []
    airtableBase('Departments').select({
      view: 'All Departments'
    }).eachPage(function page (records, fetchNextPage) {
      records.forEach(record => {
        departments.push(record)
      })
      fetchNextPage()
    }, function done (err) {
      if (err) { console.error(err); return }
      return commit('setAirtableDepartments', departments)
    })
  },
  setAirtableTeams ({commit}, payload) {
    let teams = []
    airtableBase('Teams').select({
      view: 'All Teams'
    }).eachPage(function page (records, fetchNextPage) {
      records.forEach(record => {
        teams.push(record)
      })
      fetchNextPage()
    }, function done (err) {
      if (err) { console.error(err); return }
      return commit('setAirtableTeams', teams)
    })
  },
  setAirtableStatuses ({commit}, payload) {
    let statuses = []
    airtableBase('Status Updates').select({
      view: 'All Statuses'
    }).eachPage(function page (records, fetchNextPage) {
      records.forEach(record => {
        statuses.push(record)
      })
      fetchNextPage()
    }, function done (err) {
      if (err) { console.error(err); return }
      return commit('setAirtableStatuses', statuses)
    })
  },
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', firebaseUser)
        commit('setLoading', false)
        commit('setError', null)
        router.push('/dashboard')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  userSignIn ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', firebaseUser)
        commit('setLoading', false)
        commit('setError', null)
        router.push('/dashboard')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', payload)
  },
  userSignOut ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
    router.push('/signin')
  }
}

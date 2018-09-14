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
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', firebaseUser)
        commit('setLoading', false)
        commit('setError', null)
        router.push('/home')
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
        router.push('/home')
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
    router.push('/')
  },
  userPosts ({commit}, payload) {
    let userPostsRef = firebase.database().ref('user-posts/' + payload.uid)
    userPostsRef.on('value', function (snapshot) {
      commit('setUserPosts', snapshot.val())
    })
  },
  addUserPost ({commit}, payload) {
    let postData = {
      title: payload.title,
      body: payload.body
    }
    let newPostKey = firebase.database().ref().child('user-posts/' + payload.user.uid).push().key

    let updates = {}
    updates['/user-posts/' + payload.user.uid + '/' + newPostKey] = postData

    return firebase.database().ref().update(updates)
  },
  addPatient ({commit}, payload) {
    let patientData = {
      name: payload.name,
      dob: payload.dob
    }
    let newPatientKey = firebase.database().ref().child('patients').push().key

    let updates = {}
    updates['/patients/' + newPatientKey] = patientData

    return firebase.database().ref().update(updates)
  },
  allPatients ({commit}, payload) {
    let patientsRef = firebase.database().ref('patients')
    patientsRef.on('value', function (snapshot) {
      commit('setAllPatients', snapshot.val())
    })
  },
  createGame ({commit}, payload) {
    let gameData = {
      name: payload.name,
      owner: payload.user.uid
    }
    let newGameKey = firebase.database().ref().child('games').push().key

    let gameUpdates = {}
    gameUpdates['/games/' + newGameKey] = gameData
    gameUpdates['user-games/' + payload.user.uid + '/' + newGameKey] = gameData
    firebase.database().ref().update(gameUpdates)

    let boxUpdates = {}
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        let boxData = {
          row: row,
          column: column,
          claimed: false
        }
        let newBoxKey = firebase.database().ref().child('/games/' + newGameKey + '/boxes').push().key
        boxUpdates['/games/' + newGameKey + '/boxes/' + newBoxKey] = boxData
      }
    }

    firebase.database().ref().update(boxUpdates)
    router.push('/game/' + newGameKey)
  },
  setGame ({commit}, payload) {
    let gameRef = firebase.database().ref('/games/' + payload.gameId)
    gameRef.on('value', function (snapshot) {
      commit('setGame', snapshot.val())
    })
  }
}

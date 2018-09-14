<template>
  <div>
    <h3>{{ teamData.fields.Name }}</h3>
  </div>
</template>

<script>
export default {
  name: 'TeamList',
  props: ['id'],
  data () {
    return {
      teamData: {
        fields: {
          Name: this.id
        }
      }
    }
  },
  created () {
    // check to see if teams are in state already
    let teamsInState = this.$store.getters.getAirtableTeams
    let dispatchedTeamsForTeamProjectList = this.$store.getters.getDispatchedTeamsForTeamProjectList
    if (!teamsInState && !dispatchedTeamsForTeamProjectList) {
      this.$store.dispatch('setAirtableTeams')
      this.$store.dispatch('setDispatchedTeamsForTeamProjectList', true)
    } else if (teamsInState) {
      this.teamData = teamsInState.find(team => {
        return team.id === this.id
      })
    }
    // watch state for updates
    this.$store.watch((state) => {
      return this.$store.getters.getAirtableTeams
    }, (newValue, oldValue) => {
      if (newValue) {
        this.teamData = newValue.find(team => {
          return team.id === this.id
        })
      }
    }, {
      deep: true
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

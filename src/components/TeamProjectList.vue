<template>  
  <div>
    <li v-for="project in projects">
      <ProjectStatus v-bind:status="project.fields['Latest Status'][0]"></ProjectStatus>
      
      <strong>{{ project.fields.Name }}:</strong> {{ project.fields['Latest Update'][0] }}
    </li>
  </div>
</template>

<script>
import ProjectStatus from './ProjectStatus.vue'

export default {
  name: 'TeamProjectList',
  props: ['teamId'],
  components: {
    ProjectStatus
  },
  data () {
    return {
      projects: []
    }
  },
  created () {
    // check to see if teams are in state already
    let projectsInState = this.$store.getters.getAirtableProjects
    let dispatchedProjectsForTeamProjectList = this.$store.getters.dispatchedProjectsForTeamProjectList
    if (!projectsInState && !dispatchedProjectsForTeamProjectList) {
      this.$store.dispatch('setAirtableProjects')
      this.$store.dispatch('setDispatchedProjectsForTeamProjectList', true)
    } else if (projectsInState) {
      projectsInState.forEach(project => {
        if (project.fields.Team[0] === this.teamId) {
          if (!project.fields['Latest Update']) {
            project.fields['Latest Update'] = []
            project.fields['Latest Update'].push('')
            project.fields['Latest Status'] = []
            project.fields['Latest Status'].push('')
          }
          return this.projects.push(project)
        }
      })
    }
    // watch state for updates
    this.$store.watch((state) => {
      return this.$store.getters.getAirtableProjects
    }, (newValue, oldValue) => {
      if (newValue) {
        this.projects = []
        newValue.forEach(project => {
          if (project.fields.Team[0] === this.teamId) {
            if (!project.fields['Latest Update']) {
              project.fields['Latest Update'] = []
              project.fields['Latest Update'].push('')
              project.fields['Latest Status'] = []
              project.fields['Latest Status'].push('')
            }
            return this.projects.push(project)
          }
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

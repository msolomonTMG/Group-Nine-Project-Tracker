<template>
  <v-card class="mt-1" v-bind:color="color" dark>
    <v-card-text @click="toggleProjectFilter(projectData.fields.Name)">
      {{ projectData.fields.Name }}
      <v-progress-linear v-model="projectData.fields.Progress"></v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProjectCardFilter',
  props: ['project'],
  data () {
    return {
      projectData: {
        fields: {
          Name: '',
          Progress: ''
        }
      }
    }
  },
  computed: {
    color () {
      if (this.isInFilter) {
        return 'blue darken-4'
      } else {
        return 'blue lighten-1'
      }
    },
    isInFilter () {
      return this.$store.getters.getAirtableProjectFilter.includes(this.projectData.fields.Name)
    }
  },
  methods: {
    toggleProjectFilter (projectName) {
      let projectsInFilter = this.$store.getters.getAirtableProjectFilter
      if (projectsInFilter.includes(projectName)) {
        // remove the project from the filter if already in
        let indexOfProject = projectsInFilter.indexOf(projectName)
        projectsInFilter.splice(indexOfProject, 1)
      } else {
        // add the project to the filter
        projectsInFilter.push(projectName)
      }
      this.$store.dispatch('setAirtableProjectFilter', {
        projects: projectsInFilter
      })
    }
  },
  created () {
    this.projectData.fields.Name = this.project.fields.Name
    this.projectData.fields.Progress = this.project.fields.Progress
  }
}
</script>

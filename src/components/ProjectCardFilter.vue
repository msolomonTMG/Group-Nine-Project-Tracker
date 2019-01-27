<template>
  <v-card class="mt-1" v-bind:color="color" dark>
    <v-card-text @click="toggleProjectFilter(projectData.fields.Name)">
      {{ projectData.fields.Name }}
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
          Name: ''
        }
      },
      projectsInFilter: [],
      isInFilter: false
    }
  },
  computed: {
    color () {
      if (this.isInFilter) {
        return 'blue darken-4'
      } else {
        return 'blue lighten-1'
      }
    }
  },
  methods: {
    // project names is an array of strings
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
    // watch state for updates to projects in the project filter
    this.$store.watch((state) => {
      return this.$store.getters.getAirtableProjectFilter
    }, (newValue, oldValue) => {
      if (newValue) {
        this.projectsInFilter = newValue
        if (newValue.includes(this.project.fields.Name)) {
          this.isInFilter = true
        } else {
          this.isInFilter = false
        }
      }
    })
  }
}
</script>

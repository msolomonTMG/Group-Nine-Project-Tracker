<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md2 child-flex>
        <v-card color="green lighten-2" dark>
          <v-card-text><h3>Projects</h3></v-card-text>
          <ul>
            <li v-for="project in projects">
              <ProjectCardFilter :project="project"></ProjectCardFilter>
            </li>
          </ul>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md2 child-flex>
        <v-card color="green lighten-2" dark>
          <v-card-text><h3>Phases</h3></v-card-text>
          <v-card color="blue lighten-2" dark>
            <v-card-text>Phase 1</v-card-text>
          </v-card>
          <v-card color="yellow lighten-2" dark>
            <v-card-text>Phase 2</v-card-text>
          </v-card>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md7 child-flex>
        <v-card color="green lighten-2" dark>
          <v-card-text><h3>Tasks</h3></v-card-text>
          <v-card color="green lighten-1" dark>
            <v-card-text><h4>Week 1</h4></v-card-text>
            <v-container>
              <v-card color="purple lighten-2" dark>
                <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
              </v-card>
              <v-card color="orange lighten-2" dark>
                <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
              </v-card>
              <v-card color="pink lighten-2" dark>
                <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
              </v-card>
            </v-container>
          </v-card>
          <v-card color="green lighten-1" dark>
            <v-card-text><h4>Week 2</h4></v-card-text>
            <v-container>
              <v-card color="purple lighten-2" dark>
                <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
              </v-card>
              <v-card color="orange lighten-2" dark>
                <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
              </v-card>
              <v-card color="pink lighten-2" dark>
                <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
              </v-card>
            </v-container>
          </v-card>
          <v-card color="green lighten-1" dark>
            <v-card-text><h4>Backlog</h4></v-card-text>
            <v-container>
              <ul>
                <transition-group name="list" tag="p">
                  <li v-for="task in tasks" v-bind:key="task.id" class="list-item">
                  <v-card class="mt-2" color="purple lighten-2" dark>
                    <v-layout row wrap>
                      <v-flex d-flex xs8>
                        <v-card-text>
                          {{ task.fields.Name }}
                        </v-card-text>
                      </v-flex>
                      <v-flex d-flex xs4>
                        <v-card-text>
                          <div class="pull-right pr-15">
                            <v-chip v-if="task.fields['Project Name Rollup'] && task.fields['Project Name Rollup'].length > 20">
                              {{ task.fields['Project Name Rollup'].slice(0,20).trim() }}...
                            </v-chip>
                            <v-chip v-else-if="task.fields['Project Name Rollup'] && task.fields['Project Name Rollup'].length <= 20">
                              {{ task.fields['Project Name Rollup'] }}
                            </v-chip>
                            <v-avatar size="32px">
                            <img
                              v-if="task.fields['Assignee Photo Lookup']"
                              v-bind:src="task.fields['Assignee Photo Lookup'][0].thumbnails.large.url"
                              alt="Avatar"
                            >
                            </v-avatar>
                          </div>
                        </v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </li>
                </transition-group>
              </ul>
            </v-container>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProjectCardFilter from './ProjectCardFilter.vue'

export default {
  name: 'TaskManagmeent',
  data () {
    return {
      tasks: [],
      projects: [],
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }
  },
  components: {
    ProjectCardFilter
  },
  methods: {
    sortProjectsAlphabetically (projects) {
      this.projects = projects.sort(function (a, b) {
        let textA = a.fields.Name.toUpperCase()
        let textB = b.fields.Name.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })
    }
  },
  created () {
    this.$store.dispatch('setAirtableTasks', { filters: '' })
    this.$store.dispatch('setAirtableProjects')
    this.tasks = this.$store.getters.getAirtableTasks
    this.projects = this.$store.getters.getAirtableProjects
    // watch state for updates to tasks
    this.$store.watch((state) => {
      return this.$store.getters.getAirtableTasks
    }, (newValue, oldValue) => {
      if (newValue) {
        this.tasks = newValue
      }
    })
    // watch state for updates to projects
    this.$store.watch((state) => {
      return this.$store.getters.getAirtableProjects
    }, (newValue, oldValue) => {
      if (newValue) {
        this.sortProjectsAlphabetically(newValue)
      }
    })
    // watch state for updated to project filter
    this.$store.watch((state) => {
      return this.$store.getters.getAirtableProjectFilter
    }, (newValue, oldValue) => {
      if (newValue && newValue.length > 0) {
        let filterFormula = 'OR('
        for (const [index, projectName] of newValue.entries()) {
          filterFormula += `Project = "${projectName}"`
          // if its not the last project, add a comma
          if (index + 1 !== newValue.length) {
            filterFormula += ','
          }
        }
        console.log(filterFormula + ')')
        this.$store.dispatch('setAirtableTasks', {
          filters: filterFormula + ')'
        })
      } else {
        this.$store.dispatch('setAirtableTasks', {
          filters: ''
        })
      }
    })
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.pull-right {
  float: right;
  text-align: right;
}
.pr-15 {
  padding-right: 15px;
}
</style>

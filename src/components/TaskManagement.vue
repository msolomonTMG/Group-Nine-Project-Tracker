<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md2 child-flex>
        <v-card color="green lighten-2" dark>
          <v-card-text>
            <h3>
              Projects
              <small>
                <v-text-field
                  v-model="projectFilter"
                  label="filter projects"
                ></v-text-field>
              </small>
            </h3>
          </v-card-text>
          <ul>
            <li v-for="project in filteredProjects">
              <ProjectCardFilter 
                :project="project"
                :key="project.id"
              >
              </ProjectCardFilter>
            </li>
          </ul>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md2 child-flex>
        <v-card color="green lighten-2" dark>
          <v-card-text>
            <h3>
              Phases
              <small>
                <v-text-field
                  v-model="phaseFilter"
                  label="filter phases"
                ></v-text-field>
              </small>
            </h3>
          </v-card-text>
          <ul>
            <li v-for="phase in filteredPhases">
              <PhaseCardFilter 
                :phase="phase"
                :key="phase.id"
              >
              </PhaseCardFilter>
            </li>
          </ul>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md7 child-flex>
        <v-card color="green lighten-2" dark>
          <v-card-text>
            <h3>
              Tasks
              <small>
                <v-text-field
                  v-model="taskFilter"
                  label="filter tasks"
                ></v-text-field>
              </small>
            </h3>
          </v-card-text>
          <div v-for="week in weeks">
            <v-card color="green lighten-1" dark>
              <v-card-text><h4>Week of {{ week.fields.Name }}</h4></v-card-text>
              <v-container>
                <ul>
                  <li v-for="task in filteredTasks" v-bind:key="task.id" class="list-item">
                    <div v-if="week.fields.Tasks.includes(task.id)">
                      <TaskCard :task="task" :key="task.id"></TaskCard>
                    </div>
                  </li>
                </ul>
              </v-container>
            </v-card>
          </div>
          <v-card color="green lighten-1" dark>
            <v-card-text><h4>Backlog</h4></v-card-text>
            <v-container>
              <ul>
                <transition-group name="list" tag="p">
                  <li v-for="task in filteredTasks" v-bind:key="task.id" class="list-item">
                    <div v-if="task.fields.Week === ''">
                      <TaskCard :task="task" :key="task.id"></TaskCard>
                    </div>
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
import PhaseCardFilter from './PhaseCardFilter.vue'
import TaskCard from './TaskCard.vue'

export default {
  name: 'TaskManagment',
  data () {
    return {
      tasks: [],
      phases: [],
      projects: [],
      weeks: [],
      taskFilter: '',
      phaseFilter: '',
      projectFilter: '',
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }
  },
  computed: {
    filteredTasks () {
      if (!this.tasks) {
        return []
      } else {
        return this.tasks.filter(task => {
          return task.fields.Name.toLowerCase().includes(this.taskFilter.toLowerCase())
        })
      }
    },
    filteredPhases () {
      if (!this.phases) {
        return []
      } else {
        return this.phases.filter(phase => {
          return phase.fields.Name.toLowerCase().includes(this.phaseFilter.toLowerCase())
        })
      }
    },
    filteredProjects () {
      if (!this.projects) {
        return []
      } else {
        return this.projects.filter(project => {
          return project.fields.Name.toLowerCase().includes(this.projectFilter.toLowerCase())
        })
      }
    }
  },
  components: {
    ProjectCardFilter,
    PhaseCardFilter,
    TaskCard
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
    this.$store.dispatch('setAirtableTasks', {
      filters: '{Week is Preceding, Present, Future, or Empty} = 1'
    })
    this.$store.dispatch('setAirtablePhases', {
      filters: '{Is Project Marked Done} = 0'
    })
    this.$store.dispatch('setAirtableProjects', {
      filters: 'Done = 0'
    })
    this.$store.dispatch('setAirtableWeeks', {
      filters: 'AND({Is Preceding, Present, or Future Week}, Tasks != "")'
    })
    this.tasks = this.$store.getters.getAirtableTasks
    this.phases = this.$store.getters.getAirtablePhases
    this.projects = this.$store.getters.getAirtableProjects
    this.weeks = this.$store.getters.getAirtableWeeks
    // watch state for updates to tasks
    this.$store.watch((state) => {
      return this.$store.getters.getAirtableTasks
    }, (newValue, oldValue) => {
      if (newValue) {
        this.tasks = newValue
      }
    })
    // watch state for updates to phases
    this.$store.watch((state) => {
      return this.$store.getters.getAirtablePhases
    }, (newValue, oldValue) => {
      if (newValue) {
        this.phases = newValue
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
    // watch state for updates to weeks
    this.$store.watch((state) => {
      return this.$store.getters.getAirtableWeeks
    }, (newValue, oldValue) => {
      if (newValue) {
        this.weeks = newValue
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
        this.$store.dispatch('setAirtableTasks', {
          filters: filterFormula + ')'
        })
        this.$store.dispatch('setAirtablePhases', {
          filters: filterFormula + ')'
        })
      } else {
        this.$store.dispatch('setAirtableTasks', {
          filters: ''
        })
        this.$store.dispatch('setAirtablePhases', {
          filters: ''
        })
      }
    })
    // watch state for updated to phase filter
    this.$store.watch((state) => {
      return this.$store.getters.getAirtablePhaseFilter
    }, (newValue, oldValue) => {
      if (newValue && newValue.length > 0) {
        let filterFormula = 'OR('
        for (const [index, phaseName] of newValue.entries()) {
          filterFormula += `Phase = "${phaseName}"`
          // if its not the last project, add a comma
          if (index + 1 !== newValue.length) {
            filterFormula += ','
          }
        }
        this.$store.dispatch('setAirtableTasks', {
          filters: filterFormula + ')'
        })
      } else {
        this.$store.dispatch('setAirtableTasks', {
          filters: '{Week is Preceding, Present, Future, or Empty} = 1'
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
</style>

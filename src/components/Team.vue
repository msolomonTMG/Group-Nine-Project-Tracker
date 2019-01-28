<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row justify-space-between>
        <v-flex xs12>
          <p>
            <a :href="'/department/' + departmentName">
              {{ departmentName }}
            </a>
          </p>
          <h1>
            <img v-bind:src="team.fields.Logo" style="vertical-align:middle" height="50px">
            <span style="vertical-align:middle">{{ this.$route.params.team }}</span>
          </h1>
        </v-flex>
      </v-layout>
      <v-layout row justify-space-between>
        <v-flex xs4>
          <h2>Team Notes</h2>
        </v-flex>
        <v-flex xs8>
          <CreateNewProject v-bind:teamId="team.id"></CreateNewProject>
          <ul>
            <li v-for="project in projects">
              <v-flex sm6>
                <Project v-bind:project="project"></Project>
              </v-flex>
            </li>
          </ul>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Project from './Project.vue'
import CreateNewProject from './CreateNewProject.vue'
import Airtable from 'airtable'
import { airtableConfig } from '../config'
let airtableBase = new Airtable({apiKey: airtableConfig.apiKey}).base(airtableConfig.base)

export default {
  name: 'Department',
  data () {
    return {
      team: {
        fields: [
          {
            Logo: ''
          }
        ]
      },
      projects: []
    }
  },
  components: {
    Project,
    CreateNewProject
  },
  created () {
    this.getTeam()
    if (!this.$store.getters.getDispatchedProjects) {
      this.$store.dispatch('setAirtableProjects', { filters: '' })
      this.$store.dispatch('setDispatchedProjects', true)
    }
    this.$store.watch((state) => {
      return this.$store.getters.getAirtableProjects
    }, (newValue, oldValue) => {
      this.projects = []
      newValue.forEach(project => {
        if (project.fields['Team'] &&
            project.fields['Team'][0] === this.$route.params.team) {
          this.projects.push(project)
        }
      })
    }, {
      deep: true
    })
  },
  computed: {
    departmentName () {
      if (this.team.fields['Department Name']) {
        return this.team.fields['Department Name'][0]
      }
    }
  },
  methods: {
    getTeam () {
      let that = this // once we get into airtableBase(...) we lose context
      airtableBase('Teams').select({
        view: 'All Teams',
        filterByFormula: `SEARCH("${that.$route.params.team}", Name)`
      }).eachPage(function page (teams, fetchNextPage) {
        if (teams) {
          that.team = teams[0]
        }
      }, function done (err) {
        if (err) { console.error(err); return }
        return that.team
      })
    },
    getTeamProjects () {
      let that = this // once we get into airtableBase(...) we lose context
      airtableBase('Teams').select({
        view: 'All Teams',
        filterByFormula: `SEARCH("${that.$route.params.team}", Name)`
      }).eachPage(function page (teams, fetchNextPage) {
        teams.forEach(team => {
          if (team.fields.Projects) {
            for (const project of team.fields.Projects) {
              airtableBase('Projects').find(project, (err, record) => {
                if (err) { console.error(err); return }
                that.projects.push(record)
              })
            }
          }
        })
        fetchNextPage()
      }, function done (err) {
        if (err) { console.error(err); return }
        return that.projects
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  margin-top: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #ffffff;
  text-decoration: none;
}
</style>

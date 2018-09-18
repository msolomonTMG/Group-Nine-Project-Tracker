<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row justify-space-between>
        <v-flex xs12>
          <h1>
            <img v-bind:src="department.fields.Logo" style="vertical-align:middle" height="50px">
            <span style="vertical-align:middle">{{ this.$route.params.department }}</span>
          </h1>
        </v-flex>
      </v-layout>
      <v-layout row justify-space-between>
        <v-flex xs4>
          <h2>Department Notes</h2>
          <p>
            <strong>{{ department.fields['Latest Notes'] }}</strong><br />
            {{ department.fields['Department Notes'][0] }}
          </p>
        </v-flex>
        <v-flex xs8>
          <ul>
            <li v-for="team in teams">
              <div class="h-50">
                <h2>
                  <a :href="'/department/' + team.fields['Department Name'] + '/team/' + team.fields['Name']">
                    <img v-bind:src="team.fields.Logo" style="vertical-align:middle" height="50px">
                    <span style="vertical-align:middle">{{ team.fields.Name }}</span>
                  </a>
                </h2>
              </div>
              <div v-for="project in team.projectObjects">
                <v-flex sm6>
                  <Project v-bind:project="project"></Project>
                </v-flex>
              </div>
              <div>
                <v-flex sm6>
                  <CreateNewProject v-bind:teamId="team.id"></CreateNewProject>
                </v-flex>
              </div>
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
      department: {
        fields: {
          'Department Notes': [''],
          'Latest Notes': '',
          Logo: ''
        }
      },
      notes: {
        latestNotes: '',
        lastUpdatedDate: ''
      },
      teams: []
    }
  },
  components: {
    Project,
    CreateNewProject
  },
  created () {
    this.getDepartmentTeamsInfo()
    this.getLatestDepartmentNotes()
  },
  methods: {
    getLatestDepartmentNotes () {
      let that = this // once we get into airtableBase(...) we lose context
      airtableBase('Departments').select({
        view: 'All Departments',
        filterByFormula: `SEARCH("${that.$route.params.department}", Name)`
      }).eachPage(function page (departments, fetchNextPage) {
        that.department = departments[0]
      })
    },
    getDepartmentTeamsInfo () {
      let that = this // once we get into airtableBase(...) we lose context
      airtableBase('Teams').select({
        view: 'All Teams',
        filterByFormula: `SEARCH("${that.$route.params.department}", Department)`
      }).eachPage(function page (teams, fetchNextPage) {
        teams.forEach(team => {
          team.projectObjects = []

          if (team.fields.Projects) {
            for (const project of team.fields.Projects) {
              airtableBase('Projects').find(project, (err, record) => {
                if (err) { console.error(err); return }
                team.projectObjects.push(record)
              })
            }
          }
          that.teams.push(team)
        })
        fetchNextPage()
      }, function done (err) {
        if (err) { console.error(err); return }
        return that.teams
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

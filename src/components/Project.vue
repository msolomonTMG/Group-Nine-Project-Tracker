<template>
  <div>
    <v-card>
      <v-container fluid grid-list-md>
        <v-layout row class="side-padding">
          <v-flex xs10>
            <h3>
              {{ project.fields.Name }}
            </h3>
          </v-flex>
          <v-flex xs-2 class="text-xs-right">
            <span>
              <font-awesome-icon icon="edit" />
            </span>
          </v-flex>
        </v-layout>
        <v-layout row class="side-padding">
          <v-flex xs6>
            <p>
              <strong>Owner</strong><br />
              {{ this.computedOwner }}
            </p>
          </v-flex>
        </v-layout>
        <v-layout row class="side-padding">
          <v-flex xs6>
            <p>
              <strong>Start Date</strong><br/>
              {{ this.computedStartDate }}
            </p>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <p>
              <strong>End Date</strong><br/>
              {{ this.computedEndDate }}
            </p>
          </v-flex>
        </v-layout>
        <v-layout row class="side-padding">
          <v-flex xs9>
            <strong>
              Status <CreateNewStatus :projectId="project.id"></CreateNewStatus>
            </strong>
          </v-flex>
          <v-flex xs3 class="text-xs-right">
            <strong>Last Updated</strong>
          </v-flex>
        </v-layout>
        <v-layout row class="side-padding">
          <v-flex xs9>
            <p>
              <ProjectStatus v-bind:status="this.computedStatus"></ProjectStatus>
              {{ this.computedUpdate }}
            </p>
          </v-flex>
          <v-flex xs3 class="text-xs-right">
            <p>
              {{ project.fields['Last Updated']}}
            </p>
          </v-flex>
        </v-layout>
      </v-container fluid grid-list-md>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">
            <strong>Status History</strong>
          </div>
          <v-card>
            <v-card-text>
              <v-expansion-panel>
                <v-expansion-panel-content v-for="status in sortedStatusHistory" :key="status.id">
                  <div slot="header">
                    <ProjectStatus v-bind:status="status.fields.Status"></ProjectStatus>
                    {{ status.fields.Name }}
                  </div>
                  <v-card>
                    <v-card-text>
                      {{ status.fields.Description }}
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>
  </div>
</template>

<script>
import ProjectStatus from './ProjectStatus.vue'
import CreateNewStatus from './CreateNewStatus.vue'
import _ from 'lodash'
import Airtable from 'airtable'
import { airtableConfig } from '../config'
let airtableBase = new Airtable({apiKey: airtableConfig.apiKey}).base(airtableConfig.base)

export default {
  name: 'Project',
  props: ['project'],
  components: {
    ProjectStatus,
    CreateNewStatus
  },
  data () {
    return {
      statusHistory: []
    }
  },
  created () {
    if (this.project.fields['Status Updates']) {
      this.project.fields['Status Updates'].forEach(status => {
        let that = this // once we get into airtableBase(...) we lose context
        airtableBase('Status Updates').find(status, (err, record) => {
          if (err) { console.error(err); return }
          that.statusHistory.push(record)
        })
      })
    }
  },
  computed: {
    sortedStatusHistory () {
      return _.orderBy(this.statusHistory, function (h) { return h.fields.Name }, 'desc')
    },
    computedOwner () {
      if (!this.project.fields['Owner Name']) {
        return ''
      } else {
        return this.project.fields['Owner Name'][0]
      }
    },
    computedStatus () {
      if (!this.project.fields['Latest Status']) {
        return ''
      } else {
        return this.project.fields['Latest Status'][0]
      }
    },
    computedUpdate () {
      if (!this.project.fields['Latest Update']) {
        return ''
      } else {
        return this.project.fields['Latest Update'][0]
      }
    },
    computedStartDate () {
      if (!this.project.fields['Target Start']) {
        return ''
      } else {
        return this.project.fields['Target Start']
      }
    },
    computedEndDate () {
      if (!this.project.fields['Target End']) {
        return ''
      } else {
        return this.project.fields['Target End']
      }
    }
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
.container.grid-list-md {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 0px;
}
.side-padding {
  padding-left: 5px;
  padding-right: 5px;
}
.expansion-panel {
  box-shadow: none;  
}
.no-padding {
  padding: 0px !important;
  margin-bottom: 16px;
}
</style>

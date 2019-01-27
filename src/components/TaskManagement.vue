<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md2 child-flex>
        <v-card color="green lighten-2" dark>
          <v-card-text><h3>Projects</h3></v-card-text>
          <v-card color="blue lighten-2" dark>
            <v-card-text>Project 1</v-card-text>
          </v-card>
          <v-card color="yellow lighten-2" dark>
            <v-card-text>Project 2</v-card-text>
          </v-card>
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
                <li v-for="task in tasks">
                  <v-card class="task-card" color="purple lighten-2" dark>
                    <v-layout row wrap>
                      <v-flex d-flex xs8>
                        <v-card-text>
                          {{ task.fields.Name }}
                            <!-- <span v-if="task.fields.Name && task.fields.Name.length > 58">
                              {{ task.fields.Name.slice(0,54) }}...
                            </span>
                            <span v-else>
                              {{ task.fields.Name }}
                            </span> -->
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
              </ul>
            </v-container>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'TaskManagmeent',
  data () {
    return {
      tasks: [],
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }
  },
  created () {
    this.$store.dispatch('setAirtableTasks')
    this.tasks = this.$store.getters.getAirtableTasks
    // watch state for updates
    this.$store.watch((state) => {
      return this.$store.getters.getAirtableTasks
    }, (newValue, oldValue) => {
      if (newValue) {
        this.tasks = newValue
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
.task-card {
  margin-top: 10px;
}
.pull-right {
  float: right;
  text-align: right;
}
.pr-15 {
  padding-right: 15px;
}
</style>

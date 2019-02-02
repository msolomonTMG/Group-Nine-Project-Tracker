<template>
  <v-card class="task-card mt-2" color="grey lighten-2" dark>
    <v-layout row wrap>
      <v-flex d-flex xs8>
        <v-card-text>
          <span v-if="task.fields.Status==='Done'">
            <v-icon slot="actions" color="teal">done</v-icon>
          </span>
          {{ taskData.fields.Name }}
        </v-card-text>
      </v-flex>
      <v-flex d-flex xs4>
        <v-card-text>
          <div class="pull-right pr-15">
            <v-chip v-if="taskData.fields['Project Name Rollup'] && taskData.fields['Project Name Rollup'].length > 20">
              <v-tooltip bottom>
                <span slot="activator">{{ taskData.fields['Project Name Rollup'].slice(0,20).trim() }}...</span>
                <span>{{ taskData.fields['Project Name Rollup'] }}</span>
              </v-tooltip>
            </v-chip>
            <v-chip v-else-if="taskData.fields['Project Name Rollup'] && taskData.fields['Project Name Rollup'].length <= 20">
              {{ taskData.fields['Project Name Rollup'] }}
            </v-chip>
            <v-avatar size="32px">
              <img
                v-if="taskData.fields['Assignee Photo Lookup']"
                v-bind:src="taskData.fields['Assignee Photo Lookup'][0].thumbnails.large.url"
                alt="Avatar"
              >
            </v-avatar>
          </div>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'TaskCard',
  props: ['task'],
  data () {
    return {
      taskData: {
        fields: {
          Name: '',
          ProjectNameRollup: ''
        }
      }
    }
  },
  created () {
    this.taskData = this.task
  }
}
</script>

<style scoped>
.task-card {
  color: #000000;
}
.pull-right {
  float: right;
  text-align: right;
}
.pr-15 {
  padding-right: 15px;
}
</style>

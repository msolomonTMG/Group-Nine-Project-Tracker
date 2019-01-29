<template>
  <v-container>
    <ul>
      <draggable 
        v-model="filteredTasksInWeek" 
        :options="{ group: 'tasks' }" 
        @start="drag=true" 
        @end="onEnd"
      >
        <transition-group 
          :name="weekData.fields.Name"
          :id="weekData.id"
          tag="p"
        >
          <li v-for="task in filteredTasksInWeek" v-bind:key="task.id" :id="task.id" class="list-item">
            <TaskCard :task="task" :key="task.id"></TaskCard>
          </li>
        </transition-group>
      </draggable>
    </ul>
  </v-container>
</template>

<script>
import TaskCard from './TaskCard.vue'
import draggable from 'vuedraggable'
import Airtable from 'airtable'
import { airtableConfig } from '../config'

export default {
  name: 'WeekTaskCardGroup',
  props: ['filteredTasks', 'week'],
  data () {
    return {
      tasks: [],
      weekData: {}
    }
  },
  created () {
    this.tasks = this.filteredTasks
    this.weekData = this.week
  },
  computed: {
    airtableTaskFilter () {
      return this.$store.getters.getAirtableTaskFilter
    },
    filteredTasksInWeek: {
      set (newValue) {
        return this.tasks.filter(task => {
          return this.weekData.fields.Tasks.includes(task.id)
        })
      },
      get () {
        return this.tasks.filter(task => {
          return this.weekData.fields.Tasks.includes(task.id)
        })
      }
    }
  },
  components: {
    TaskCard,
    draggable
  },
  methods: {
    updateTaskWeek (taskId, weekId) {
      let airtableBase = new Airtable({apiKey: airtableConfig.apiKey}).base(airtableConfig.base)
      airtableBase('Tasks').update(`${taskId}`, {
        'Week': [`${weekId}`]
      }, (err, record) => {
        if (err) { console.error(err); return }
        this.$store.dispatch('setAirtableTasks', {
          filters: this.airtableTaskFilter
        })
      })
    },
    onChange (evt) {
      console.log('On Change')
      console.log(evt.item)
      console.log(evt.to)
      console.log(evt.from)
      console.log(evt.oldIndex)
      console.log(evt.newIndex)
    },
    onEnd (evt) {
      console.log('On End')
      console.log(evt.item)
      console.log(evt.to)
      console.log(evt.from)
      console.log(evt.oldIndex)
      console.log(evt.newIndex)
      evt.to.insertBefore(evt.item, evt.to.children[evt.item.newIndex])
      console.log(evt.item.id)
      console.log(evt.to.id)
      this.updateTaskWeek(evt.item.id, evt.to.id)
    }
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

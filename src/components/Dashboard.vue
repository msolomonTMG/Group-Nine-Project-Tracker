<template>
  <div>
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="department in departments">
        <h2>
          <a :href="'/department/' + department.fields.Name">{{ department.fields.Name }}</a>
        </h2>
        <ul>
          <li v-for="teamId in department.fields.Teams">
            <TeamList v-bind:id="teamId"></TeamList>
            <TeamProjectList v-bind:teamId="teamId"></TeamProjectList>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import TeamList from './TeamList.vue'
import TeamProjectList from './TeamProjectList.vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Operations Statuses',
      departments: []
    }
  },
  components: {
    TeamList,
    TeamProjectList
  },
  beforeCreate () {
    this.$store.dispatch('setAirtableDepartments')
  },
  created () {
    this.$store.watch((state) => {
      return this.$store.getters.getAirtableDepartments
    }, (newValue, oldValue) => {
      this.departments = newValue
    }, {
      deep: true
    })
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
</style>

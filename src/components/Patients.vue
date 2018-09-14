<template>
  <v-layout column>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h3>Patients</h3>
    </v-flex>
    <v-flex class="text-xs-center" mt-5>
      <p>These are all of the patients</p>
      <p>{{ user.email }}</p>
    </v-flex>
    <li v-for="patient in patients">
      {{ patient.name }}: {{ patient.dob }}
    </li>
    <v-flex class="text-xs-center" mt-5>
      <form @submit.prevent="addPatient">
        <v-layout column>
          <v-flex>
            <v-text-field
              name="name"
              label="Name"
              id="name"
              type="text"
              v-model="name"
              required></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              name="dob"
              label="Date of Birth"
              id="dob"
              type="date"
              v-model="dob"
              required></v-text-field>
          </v-flex>
          <v-flex class="text-xs-center" mt-5>
            <v-btn primary type="submit">Add Patient</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      // appTitle: 'Awesome App',
      name: '',
      dob: ''
    }
  },
  methods: {
    addPatient () {
      this.$store.dispatch('addPatient', { name: this.name, dob: this.dob })
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    patients () {
      this.$store.dispatch('allPatients', this.user)
      return this.$store.getters.getAllPatients
    }
  }
}
</script>

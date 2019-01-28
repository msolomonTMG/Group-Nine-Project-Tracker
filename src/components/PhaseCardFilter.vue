<template>
  <v-card class="mt-1" v-bind:color="color" dark>
    <v-card-text @click="togglePhaseFilter(phaseData.fields.Name)">
      {{ phaseData.fields.Name }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PhaseCardFilter',
  props: ['phase'],
  data () {
    return {
      phaseData: {
        fields: {
          Name: ''
        }
      }
    }
  },
  computed: {
    color () {
      if (this.isInFilter) {
        return 'blue darken-4'
      } else {
        return 'blue lighten-1'
      }
    },
    isInFilter () {
      return this.$store.getters.getAirtablePhaseFilter.includes(this.phaseData.fields.Name)
    }
  },
  methods: {
    togglePhaseFilter (phaseName) {
      let phasesInFilter = this.$store.getters.getAirtablePhaseFilter
      if (phasesInFilter.includes(phaseName)) {
        // remove the phase from the filter if already in
        let indexOfPhase = phasesInFilter.indexOf(phaseName)
        phasesInFilter.splice(indexOfPhase, 1)
      } else {
        // add the phase to the filter
        phasesInFilter.push(phaseName)
      }
      this.$store.dispatch('setAirtablePhaseFilter', {
        phases: phasesInFilter
      })
    }
  },
  created () {
    this.phaseData.fields.Name = this.phase.fields.Name
  }
}
</script>

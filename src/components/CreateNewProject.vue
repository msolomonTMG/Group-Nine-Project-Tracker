<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn round slot="activator" color="primary" dark>
        <font-awesome-icon icon="plus-circle" />
        <span class="padding-left"> Add New Project</span>
      </v-btn>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
          <v-btn round color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'CreateNewProject',
  props: ['teamId'],
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    createNewProject () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 button {
   font-size: 12px;
 }
 .padding-left {
   padding-left: 5px;
 }
</style>

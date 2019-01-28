<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <span slot="activator"><font-awesome-icon icon="plus-circle" /></span>
    <v-card>
      <v-card-title class="headline">Add a New Status</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form">
            <v-layout row>
              <v-flex xs12>
                <v-select
                  v-model="status"
                  :items="this.statusOptions"
                  label="Status"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-textarea
                  v-model="description"
                  name="description"
                  label="Description"
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                  hint="Give a brief update about the project"
                  required
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn round color="grey darken-1" flat @click.native="dialog = false">Cancel</v-btn>
        <v-btn round flat @click="submit" @click.native="dialog = false">Add Status</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Airtable from 'airtable'
import { airtableConfig } from '../config'
let airtableBase = new Airtable({apiKey: airtableConfig.apiKey}).base(airtableConfig.base)

export default {
  name: 'CreateNewStatus',
  props: ['projectId'],
  data () {
    return {
      dialog: false,
      description: '',
      status: null,
      statusOptions: [
        'Green', 'Yellow', 'Red', 'Blocked Internal', 'Blocked External', 'Planning'
      ]
    }
  },
  methods: {
    submit () {
      airtableBase('Status Updates').create({
        'Project': [this.projectId],
        'Description': this.description,
        'Status': this.status
      }, (err, record) => {
        if (err) { console.error(err); return }
        this.$store.dispatch('setAirtableStatuses')
        this.$store.dispatch('setAirtableProjects', { filters: '' })
        this.$store.dispatch('setSnackbar', {
          show: true,
          message: 'Status Created',
          color: 'success'
        })
      })
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

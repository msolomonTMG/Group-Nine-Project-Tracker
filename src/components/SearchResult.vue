<!-- <template >
  <v-layout>
    <v-flex xs12 mt-5 ht-5>
      <v-card>
        <v-card-media v-bind:src="'https://assets3.thrillist.com/v1/image/' + result.image" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-2">{{ result.title.substring(0, 25).concat('...') }}</h3>
            <div>{{ result.description.substring(0, 25).concat('...') }}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" v-bind:href="'//www.' + brand + '.com/' + result.url ">Go</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template> -->

<template>
  <v-layout row>
    <v-flex xs12>
      <v-list two-line>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img v-bind:src="'https://assets3.thrillist.com/v1/image/' + result.image" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="result.title"></v-list-tile-title>
            <v-list-tile-sub-title>
              {{ result.node_type }}
            </v-list-tile-sub-title>
            <v-list-tile-sub-title>
              <span v-for="term in result.term.slice(0, 5)">
                <v-chip v-html="term"></v-chip>
              </span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['result', 'brand']
}
</script>

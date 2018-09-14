<template>
  <v-layout column>
    <v-flex xs12 text-xs-center mt-5>
      <h1>Media Management</h1>
    </v-flex>
    <v-container grid-list-md>
      <!-- search row -->
      <v-layout row wrap>
        <v-flex xs12 text-xs-center>
          <v-card>
            <v-container>
              <v-layout row wrap>
                <v-flex xs6 offset-xs3 text-xs-center>
                  <v-card-text class="px-0">
                    <v-form>
                      <v-text-field placeholder="🔍 Search for Content" v-model="query"></v-text-field>
                    </v-form>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- results row -->
      <v-layout row wrap>
        <v-flex xs12 mt-5>
          <v-card>
            <v-container>
              <v-layout row wrap>
                <v-flex xs6>
                  <ais-index app-id="6H9O5A6GQN" api-key="66383f69ff495477998cb9a912653b69"
                    index-name="thrillist" :query-parameters="{query: query}"
                  >
                    <ais-search-box style="display: none"/>
                    <v-layout row>
                      <ais-results>
                        <div slot-scope="{ result }">
                          <search-result :result="result" :brand="'thrillist'"></search-result>
                        </div>
                      </ais-results>
                    </v-layout>
                  </ais-index>
                </v-flex>
                <v-flex xs6>
                  <ais-index app-id="6H9O5A6GQN" api-key="66383f69ff495477998cb9a912653b69"
                    index-name="thedodo" :query-parameters="{query: query}"
                  >
                    <ais-search-box style="display: none" />
                    <v-layout row>
                      <ais-results>
                        <div slot-scope="{ result }">
                          <search-result :result="result" :brand="'thrillist'"></search-result>
                        </div>
                      </ais-results>
                    </v-layout>
                  </ais-index>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <li v-for="post in posts">
      {{ post.title }}: {{ post.body }}
    </li>
    <form @submit.prevent="createGame">
      <v-layout column>
        <v-flex class="text-xs-center" mt-5>
          <v-flex>
            <v-text-field
              name="name"
              label="Game Name"
              id="name"
              type="text"
              v-model="name"
              required></v-text-field>
          </v-flex>
          <v-btn primary type="submit">Create Game</v-btn>
        </v-flex>
      </v-layout>
    </form>
    <v-flex class="text-xs-center" mt-5>
      <form @submit.prevent="addUserPost">
        <v-layout column>
          <v-flex>
            <v-text-field
              name="title"
              label="Title"
              id="text"
              type="text"
              v-model="title"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="body"
              label="Body"
              id="body"
              type="text-area"
              v-model="body"
              required></v-text-field>
          </v-flex>
          <v-flex class="text-xs-center" mt-5>
            <v-btn primary type="submit">Add Post</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
  </v-layout>

</template>

<script>
import SearchResult from './SearchResult.vue'

export default {
  data () {
    return {
      // appTitle: 'Awesome App',
      title: '',
      body: '',
      query: ''
    }
  },
  methods: {
    addUserPost () {
      this.$store.dispatch('addUserPost', { user: this.user, title: this.title, body: this.body })
    },
    createGame () {
      this.$store.dispatch('createGame', { user: this.user, name: this.name })
    }
  },
  components: {
    'search-result': SearchResult
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    posts () {
      this.$store.dispatch('userPosts', this.user)
      return this.$store.getters.getUserPosts
    }
  }
}
</script>

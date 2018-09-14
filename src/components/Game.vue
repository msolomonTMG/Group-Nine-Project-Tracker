<template>
  <v-layout column>
    <v-flex xs12 class="text-xs-center">
      <h3>Game page</h3>
    </v-flex>
    <v-flex class="text-xs-center" mt-5>
      <p>This is a user's home page</p>
      <p>{{ game.name }}</p>
        <table>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
          </tr>
          <tr>
            <span v-for="box in game.boxes">
                <td v-if="box.row == 0">{{ box.column }}</td>
            </span>
          </tr>
          <tr>
            <span v-for="box in game.boxes">
                <td v-if="box.row == 1">{{ box.column }}</td>
            </span>
          </tr>
          <tr>
            <span v-for="box in game.boxes">
                <td v-if="box.row == 2">{{ box.column }}</td>
            </span>
          </tr>
          <tr>
            <span v-for="box in game.boxes">
                <td v-if="box.row == 3">{{ box.column }}</td>
            </span>
          </tr>
          <tr>
            <span v-for="box in game.boxes">
                <td v-if="box.row == 4">{{ box.column }}</td>
            </span>
          </tr>
        </table>
      </div>
    </v-flex>
  </v-layout>

</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    game () {
      this.$store.dispatch('setGame', this.$route.params)
      return this.$store.getters.getGame
    }
  }
}
</script>

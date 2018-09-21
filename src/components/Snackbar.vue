<template>
  <v-snackbar 
    v-model="show"
    :color="color"
    :top="y === 'top'"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :right="x === 'right'">
    {{message}}
    <v-btn flat color="primary" @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: 'Just a harmless little pop up',
      y: null,
      x: 'bottom',
      color: 'success'
    }
  },
  created () {
    this.$store.watch((state) => {
      return this.$store.getters.getSnackbar
    }, (newValue, oldValue) => {
      this.show = newValue.show
      this.message = newValue.message
      this.color = newValue.color
    })
  }
}
</script>

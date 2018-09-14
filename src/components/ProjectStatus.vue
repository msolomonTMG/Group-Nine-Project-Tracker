<template>
  <span>
    <span class="success--text" v-if="status === 'Green'">
      <font-awesome-icon icon="check-circle" />
    </span>
    <span class="warning--text" v-else-if="status === 'Yellow'">
      <font-awesome-icon icon="circle" />
    </span>
    <span class="error--text" v-else-if="status === 'Red'">
      <font-awesome-icon icon="exclamation-circle" />
    </span>
    <span class="transparent" v-else>
      <font-awesome-icon icon="question-circle"/>
    </span>
  </span>
</template>

<script>
export default {
  name: 'ProjectStatus',
  props: ['status'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.transparent {
  color: rgba(0,0,0,0.3);
}
</style>

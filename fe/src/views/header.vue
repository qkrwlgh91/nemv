<template>
  <v-container>
    <v-btn @click="headerSend">임의 헤더 전송</v-btn>
    <v-btn @click="headerSend2">오쏘 헤더 전송</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  mounted () {
    console.log(localStorage)
  },
  methods: {
    headerSend () {
      axios.get(`${this.$apiRootPath}test`, { headers: { xxx: 1234 } })
        .then(r => console.log(r))
        .catch(e => console.log(e))
    },
    headerSend2 () {
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: 'fake token!' } })
    }
  }
}
</script>

<template>
  <v-container grid-list-md>
    <v-row row wrap>
      <v-col col="12" xs="12">
        <v-btn color="primary" @click="pop('click test')">test button</v-btn>
      </v-col>
      <v-col xs="12" sm="6" md="4" v-for="user in users" :key="user._id">
        <user-card :user="user" @sbOpen="pop"></user-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
    </v-snackbar>
  </v-container>
</template>
<script>
import userCard from '@/components/user'

export default {
  components: {
    userCard
  },
  data () {
    return {
      users: [],
      sb: {
        act: false,
        msg: 'love'
      }
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    pop (m) {
      this.sb.msg = m
      this.sb.act = true
    },
    getUsers () {
      this.$axios.get(`${this.$apiRootPath}manage/user`)
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e) => {
          this.pop(e.message)
        })
    }
  }
}
</script>

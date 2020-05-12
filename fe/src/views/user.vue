<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        xs="12"
        sm="3"
        md="4"
        lg="6"
      >
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>get</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">subtitle</v-card-subtitle>
          <v-card-text class="text--primary">
            <v-textarea v-model='getMd'>

            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange"
              text
              @click="getReq"
            >
              submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="3"
        md="4"
        lg="6"
      >
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>post</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">subtitle</v-card-subtitle>
          <v-card-text class="text--primary">
            <v-textarea v-model='postMd'>

            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange"
              text
              @click="postReq"
            >
              submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="3"
        md="4"
        lg="6"
      >
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>put</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">subtitle</v-card-subtitle>
          <v-card-text class="text--primary">
            <v-textarea v-model='putMd'>

            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange"
              text
              @click="putReq"
            >
              submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="3"
        md="4"
        lg="6"
      >
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>del</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">subtitle</v-card-subtitle>
          <v-card-text class="text--primary">
            <v-textarea v-model='delMd'>

            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange"
              text
              @click="delReq"
            >
              submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      users: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: ''
    }
  },
  mounted () {

  },
  methods: {
    getReq () {
      axios.get('http://localhost:3000/api/user', {
        user: 'postMan'
      })
        .then((r) => {
          this.getMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    postReq () {
      axios.post('http://localhost:3000/api/user', {
        user: 'postMan'
      })
        .then((r) => {
          this.postMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    putReq () {
      axios.put('http://localhost:3000/api/user', {
        user: 'postMan'
      })
        .then((r) => {
          this.putMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    delReq () {
      axios.delete('http://localhost:3000/api/user')
        .then((r) => {
          this.delMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    }
  }
}
</script>

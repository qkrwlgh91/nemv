<template>
  <v-container class="grey lighten-5">
    <!-- <v-row no-gutters>
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
    </v-row> -->
    <v-row no-gutters>
      <v-col
        cols="12"
        xs="12"
        sm="3"
        md="4"
        lg="6"
        v-for="(user, i) in users"
        :key="i"
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
          <v-card-title>{{user.name}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">{{user.age}}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>
          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange"
              text
              @click="putDialog(user)"
            >
              수정
            </v-btn>

            <v-btn
              color="error"
              text
              @click="delUser(user._id)"
            >
              삭제
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  v-model="userName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="userAges"
                  label="Age*"
                  required
                  v-model="userAge"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="putUser">수정</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="postUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      top
    >
      {{ sbMsg }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      color="pink"
      @click="mdUp"
    >
      <v-icon>add</v-icon>
    </v-btn>
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
      delMd: '',
      dialog: false,
      userAges: [

      ],
      userName: '',
      userAge: 0,
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    for (let i = 10; i < 40; i++) this.userAges.push(i)
    this.getUsers()
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
        name: '가정', age: 333
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
    },
    mdUp () {
      this.userName = ''
      this.userAge = ''
      this.dialog = true
    },
    postUser () {
      // console.log(this.userName, this.userAge)
      this.dialog = false
      axios.post('http://localhost:3000/api/user', {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          this.pop('사용자 등록 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    getUsers () {
      axios.get('http://localhost:3000/api/user')
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    putDialog (user) {
      this.putId = user._id
      this.dialog = true
      this.userName = user.name
      this.userAge = user.age
    },
    putUser () {
      this.dialog = false
      axios.put(`http://localhost:3000/api/user/${this.putId}`, {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          this.pop('사용자 수정 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    delUser (id) {
      axios.delete(`http://localhost:3000/api/user/${id}`)
        .then((r) => {
          this.pop('사용자 삭제 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    }
  }
}
</script>

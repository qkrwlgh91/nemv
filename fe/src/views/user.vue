<template>
  <v-container grid-list-md>
    <v-row row wrap>
      <v-col xs="12" sm="6" md="4" v-for="user in users" :key="user._id">

        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{user.id}}</h3>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-title primary-title>
            <div>
              <div>이름: {{user.name}}</div>
              <div>권한: {{user.lv}}</div>
              <div>나이: {{user.age}}</div>
              <div>로그인 횟수: {{user.inCnt}}</div>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn text color="orange" @click="putDialog(user)">수정</v-btn>
            <v-btn text color="error" @click="delUser(user._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-row wrap>
              <v-col xs12 sm6 md4>
                <v-text-field
                  label="이름"
                  hint="홍길동"
                  persistent-hint
                  required
                  v-model="userName"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="6">
                <v-select
                  :items="userLvs"
                  label="권한"
                  required
                  v-model="userLv"
                ></v-select>
              </v-col>
              <v-col xs="12" sm="6">
                <v-select
                  :items="userAges"
                  label="나이"
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
          <v-btn color="blue darken-1" text @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
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
  </v-container>
</template>
<script>

export default {
  data () {
    return {
      users: [],
      dialog: false,
      userAges: [],
      userLvs: [],
      userAge: 0,
      userLv: 0,
      userName: '',
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    for (let i = 10; i < 40; i++) this.userAges.push(i)
    for (let i = 0; i < 4; i++) this.userLvs.push(i)
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$axios.get(`${this.$apiRootPath}manage/user`)
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
      this.userLv = user.lv
      this.userAge = user.age
    },
    putUser () {
      this.dialog = false
      this.$axios.put(`${this.$apiRootPath}manage/user/${this.putId}`, {
        name: this.userName, lv: this.userLv, age: this.userAge
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
      this.$axios.delete(`${this.$apiRootPath}manage/user/${id}`)
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

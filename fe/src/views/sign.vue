<template>
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="아이디"
                  prepend-icon="person"
                  type="text"
                  v-model="form.id"
                ></v-text-field>
                <v-text-field
                  id="password"
                  label="비밀번호"
                  prepend-icon="lock"
                  type="password"
                  v-model="form.pwd"
                ></v-text-field>
                <v-checkbox
                  v-model="form.remember"
                  label="암호 기억하기(최대 7일간 보관 됩니다.)"
                ></v-checkbox>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signIn">로그인</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        id: '',
        pwd: '',
        remember: false
      }
    }
  },
  methods: {
    signIn () {
      axios.post(`${this.$apiRootPath}sign/in`, this.form)
        .then(r => {
          if (!r.data.success) return console.error(r.data.msg)
          console.log(r.data)
          localStorage.setItem('token', r.data.token)
          this.$store.commit('getToken', r.data.user)
          this.$router.push('/test/lv0')
          // location.href('/header')
        })
        .catch(e => console.error(e.message))
    }
  }
}
</script>

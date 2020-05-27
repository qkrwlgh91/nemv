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
              <v-toolbar-title>회원 가입</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <ValidationObserver ref="observer" v-slot="{ validate, reset }">
                <form>
                  <ValidationProvider v-slot="{ errors }" name="아이디" rules="required|min:5|max:20">
                    <v-text-field
                      v-model="form.id"
                      :counter="20"
                      :error-messages="errors"
                      label="아이디"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" name="비밀번호" rules="required|min:6|max:20">
                    <v-text-field
                      v-model="form.pwd"
                      :counter="20"
                      :error-messages="errors"
                      label="비밀번호"
                      required
                      type="password"
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" name="회원 이름" rules="required|min:1|max:10">
                    <v-text-field
                      v-model="form.name"
                      :counter="10"
                      :error-messages="errors"
                      label="회원 이름"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                  <!-- <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                    <v-text-field
                      v-model="email"
                      :error-messages="errors"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" name="select" rules="required">
                    <v-select
                      v-model="select"
                      :items="items"
                      :error-messages="errors"
                      label="Select"
                      data-vv-name="select"
                      required
                    ></v-select>
                  </ValidationProvider> -->
                  <ValidationProvider v-slot="{ errors, valid }" rules="required" name="약관동의">
                    <v-checkbox
                      v-model="agree"
                      :error-messages="errors"
                      value="1"
                      label="이용약관 : 암호는 저장됩니다. 주의하세요."
                      type="checkbox"
                      required
                    ></v-checkbox>
                  </ValidationProvider>

                  <v-btn color="primary" class="mr-4" @click="submit">가입</v-btn>
                  <v-btn color="secondary" @click="clear">취소</v-btn>
                </form>
              </ValidationObserver>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
      <v-btn
        :color="sb.color"
        text
        @click="snackbar = false"
      >
        닫기
      </v-btn>
    </v-snackbar>
    </v-container>
  </v-content>
</template>

<script>
import { required, email, max, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})
extend('min', {
  ...min,
  message: '{_field_} 최소 글자는 {length} 이상이어야 합니다'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    form: {
      id: '',
      pwd: '',
      name: ''
    },
    sb: {
      act: false,
      color: 'warning',
      msg: ''
    },
    agree: null
  }),
  methods: {
    submit () {
      this.$refs.observer.validate()
        .then(r => {
          if (!r) throw new Error('필수항목을 다 채워주세요')
          return this.$axios.post('register', this.form)
        })
        .then(r => {
          if (!r.data.success) return this.pop('서버에러', 'warning')
          this.pop('성공', 'success')
          this.$router.push('/sign')
        })
        .catch(e => this.pop(e.message, 'error'))
    },
    clear () {
      this.form.id = ''
      this.form.pwd = ''
      this.form.name = ''
      // this.select = null
      this.agree = null
      this.$refs.observer.reset()
    },
    pop (msg, cl) {
      this.sb.act = true
      this.sb.msg = msg
      this.sb.color = cl
    }
  }
}
</script>

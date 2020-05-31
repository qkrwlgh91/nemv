<template>
  <v-container grid-list-md>
    <v-alert
      :value="!sites.length"
      type="warning"
    >
      데이터가 없습니다
    </v-alert>
    <v-row wrap>
      <v-col cols="12" xs="12" sm="6" md="4" v-for="site in sites" :key="site._id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{site.title}}</h3>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-title primary-title>
            <div>
              <div>하단: {{site.copyright}}</div>
              <div>블랙 모드: {{site.dark}}</div>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn text color="orange" @click="putDialog(site)">수정</v-btn>
            <v-btn text color="error" @click="delPage(site._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">사이트 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-row wrap>
              <v-col xs="12" sm="6" md="4">
                <v-text-field
                  label="사이트 이름"
                  hint="이름"
                  persistent-hint
                  required
                  v-model="siteTitle"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="6" md="4">
                <v-text-field
                  label="사이트 하단"
                  hint="카피"
                  persistent-hint
                  required
                  v-model="siteCopyright"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="6" md="4">
                <v-switch
                  v-model="siteDark"
                  label="다크모드"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="putPage">수정</v-btn>
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
      sites: [],
      dialog: false,
      siteTitle: '',
      siteCopyright: '',
      siteDark: false,
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    this.getSites()
  },
  methods: {
    getSites () {
      this.$axios.get(`${this.$apiRootPath}manage/site`)
        .then((r) => {
          this.sites = r.data.sites
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    putDialog (site) {
      this.putId = site._id
      this.dialog = true
      this.siteTitle = site.title
      this.siteCopyright = site.copyright
      this.siteDark = site.dark
    },
    putPage () {
      this.dialog = false
      this.$axios.put(`${this.$apiRootPath}manage/site/${this.putId}`, {
        title: this.siteTitle, copyright: this.siteCopyright, dark: this.siteDark
      })
        .then((r) => {
          this.pop('페이지 수정 완료')
          this.getSites()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    delPage (id) {
      this.$axios.delete(`${this.$apiRootPath}manage/site/${id}`)
        .then((r) => {
          this.pop('페이지 삭제 완료')
          this.getSites()
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

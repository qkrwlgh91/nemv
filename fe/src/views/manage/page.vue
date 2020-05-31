<template>
  <v-container grid-list-md>
    <v-alert
      :value="!pages.length"
      type="warning"
    >
      데이터가 없습니다
    </v-alert>
    <v-row wrap>
      <v-col cols="12" xs="12" sm="6" md="4" v-for="page in pages" :key="page._id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{page.name}}</h3>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-title primary-title>
            <div>
              <div>권한: {{page.lv}}</div>
              <div>진입 횟수: {{page.inCnt}}</div>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn text color="orange" @click="putDialog(page)">수정</v-btn>
            <v-btn text color="error" @click="delPage(page._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">페이지 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-row wrap>
              <v-col xs="12" sm="6" md="4">
                <v-text-field
                  label="페이지 이름"
                  hint="게시판"
                  persistent-hint
                  required
                  v-model="pageName"
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="6">
                <v-select
                  :items="pageLvs"
                  label="권한"
                  required
                  v-model="pageLv"
                ></v-select>
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
      pages: [],
      dialog: false,
      pageLvs: [],
      pageLv: 0,
      pageName: '',
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    for (let i = 0; i < 4; i++) this.pageLvs.push(i)
    this.getPages()
  },
  methods: {
    getPages () {
      this.$axios.get(`${this.$apiRootPath}manage/page`)
        .then((r) => {
          this.pages = r.data.pages
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    putDialog (page) {
      this.putId = page._id
      this.dialog = true
      this.pageName = page.name
      this.pageLv = page.lv
    },
    putPage () {
      this.dialog = false
      this.$axios.put(`${this.$apiRootPath}manage/page/${this.putId}`, {
        name: this.pageName, lv: this.pageLv
      })
        .then((r) => {
          this.pop('페이지 수정 완료')
          this.getPages()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    delPage (id) {
      this.$axios.delete(`${this.$apiRootPath}manage/page/${id}`)
        .then((r) => {
          this.pop('페이지 삭제 완료')
          this.getPages()
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

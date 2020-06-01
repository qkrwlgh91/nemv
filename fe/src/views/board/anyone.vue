<template>
  <v-container grid-list-md>
    <v-row wrap>
      <v-col xs="12">
        <v-card>
          <v-img
            class="white--text"
            height="70px"
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
          >
            <v-container fill-height fluid>
              <v-row fill-height>
                <v-col xs="6" align-end flexbox>
                  <span class="headline">{{board.name}}</span>
                </v-col>
                <v-col s="6" align-end flexbox>
                  <span>{{board.rmk}}</span>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-card>
      </v-col>
      <!-- <v-col xs="12" sm="6" md="4" v-for="article in articles" :key="article._id">
        {{article}}
      </v-col> -->
      <v-col xs="12">
        <v-data-table
          :headers="headers"
          :items="articles"
          :options.sync="pagination"
          footer-props.items-per-page-text=""
          :loading="loading"
          class="text-no-wrap"
          sort-by
          >
          <template slot="items" slot-scope="props">
            <td :class="headers[0].class">{{ id2date(props.item._id) }}</td>
            <td :class="headers[1].class">{{ props.item.title }}</td>
            <td :class="headers[2].class">{{ props.item._user ? props.item._user.name : '손님' }}</td>
            <td :class="headers[3].class">{{ props.item.cnt.view }}</td>
            <td :class="headers[4].class">{{ props.item.cnt.like }}</td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-btn
      color="pink"
      dark
      small
      absolute
      bottom
      right
      fab
      @click="addDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">글 작성</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-row wrap>
              <v-col xs="12">
                <v-text-field
                  label="제목"
                  persistent-hint
                  required
                  v-model="form.title"
                ></v-text-field>
              </v-col>
              <v-col xs="12">
                <v-textarea
                  label="내용"
                  persistent-hint
                  required
                  v-model="form.content"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="add()">확인</v-btn>
          <v-btn color="red darken-1" text @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
      <v-btn
        :color="sb.color"
        text
        @click="sb.act = false"
      >
        닫기
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
// import boardCard from '@/components/manage/boardCard'

export default {
  // components: { boardCard },
  data () {
    return {
      board: {
        name: '로딩중...',
        rmk: '무엇?'
      },
      articles: [],
      dialog: false,
      lvs: [0, 1, 2, 3],
      form: {
        title: '',
        content: ''
      },
      sb: {
        act: false,
        msg: '',
        color: 'error'
      },
      headers: [
        { text: '날짜', value: '_id', sortable: true, class: 'hidden-sm-and-down' },
        { text: '제목', value: 'title', sortable: true },
        { text: '글쓴이', value: '_user', sortable: false },
        { text: '조회수', value: 'cnt.view', sortable: true },
        { text: '추천', value: 'cnt.like', sortable: true }
      ],
      loading: false,
      pagination: {},
      getTotalPage: 1
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    addDialog () {
      this.dialog = true
      this.form = {
        title: '',
        content: ''
      }
    },
    get () {
      this.$axios.get('board/이알피그녀')
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.board = data.d
          this.list()
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    add () {
      if (!this.form.title) return this.pop('제목을 작성해주세요', 'warning')
      if (!this.form.content) return this.pop('내용을 작성해주세요', 'warning')
      this.$axios.post(`article/${this.board._id}`, this.form)
        .then((r) => {
          this.dialog = false
          this.list()
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    list () {
      if (this.loading) return
      this.loading = true
      this.$axios.get(`article/${this.board._id}`)
        .then(({ data }) => {
          this.articles = data.ds
          this.loading = false
        })
        .catch((e) => {
          this.pop(e.message, 'error')
          this.loading = false
        })
    },
    pop (m, c) {
      this.sb.act = true
      this.sb.msg = m
      this.sb.color = c
    },
    id2date (val) {
      if (!val) return '잘못된 시간 정보'
      return new Date(parseInt(val.substring(0, 8), 16) * 1000).toLocaleString()
    }
  }
}
</script>

<template>
  <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
        <h1 class="display-1 font-weight-thin mb-4">{{ board.name }}</h1>
        <h4 class="subheading">{{ board.rmk }}</h4>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
export default {
  data () {
    return {
      board: {
        name: '로딩중...',
        rmk: '무엇?'
      }
    }
  },
  mounted () {
    this.getBoard()
  },
  methods: {
    getBoard () {
      this.$axios.get('board/이알피그녀')
        .then(r => {
          this.board = r.data.d
          // getArt(this.board._id)
          console.log(r.data)
        })
        .catch(e => console.error(e.message))
    }
  }
}
</script>

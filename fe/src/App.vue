<template>
  <v-app :dark="siteDark">
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-item
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-item-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="siteTitle"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <template v-if="!$store.state.token">
              <v-list-item @click="$router.push('../sign')">
                <v-list-item-title>로그인</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$router.push('../register')">
                <v-list-item-title>회원가입</v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item v-else @click="signOut">
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer fixed app>
      <span>&copy; {{ siteCopyRight }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      siteTitle: '미정',
      siteCopyRight: '2020 JH',
      siteDark: false,
      items: [{
        icon: 'home',
        title: 'lv0',
        to: {
          path: '/'
        }
      },
      {
        icon: 'home',
        title: 'lv1',
        to: {
          path: '/lv1'
        }
      },
      {
        icon: 'home',
        title: 'lv2',
        to: {
          path: '/lv2'
        }
      },
      {
        icon: 'home',
        title: 'lv3',
        to: {
          path: '/lv3'
        }
      },
      {
        icon: 'face',
        title: '사용자관리',
        to: {
          path: '/user'
        }
      },
      {
        icon: 'face',
        title: '페이지관리',
        to: {
          path: '/page'
        }
      },
      {
        icon: 'face',
        title: '사이트관리',
        to: {
          path: '/site'
        }
      },
      {
        icon: 'face',
        title: '사용자관리 components',
        to: {
          path: '/users'
        }
      },
      {
        icon: 'settings',
        title: '게시판관리 ',
        to: {
          path: '/manage/boards'
        }
      }],
      title: this.$apiRootPath // 'Vuetify.js'
    }
  },
  mounted () {
    this.getSite()
  },
  methods: {
    getSite () {
      this.$axios.get('site')
        .then(r => {
          this.siteTitle = r.data.d.title
          this.siteCopyRight = r.data.d.copyright
          this.siteDark = r.data.d.dark
        })
    },
    signOut () {
      // localStorage.removeItem('token')
      this.$store.commit('delToken')
      this.$router.push('/sign')
    }
  }
}
</script>

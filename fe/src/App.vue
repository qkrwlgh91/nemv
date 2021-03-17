<template>
  <v-app :dark="siteDark">
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in item.subItem"
            :key="subItem.title"
            :to="subItem.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
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
        icon: 'chat',
        title: '게시판',
        active: true,
        subItem: [
          {
            title: '아무나',
            to: {
              path: '/'
            }
          }
        ]
      },
      {
        icon: 'pan_tool',
        title: '레벨테스트',
        active: true,
        subItem: [
          {
            icon: 'home',
            title: '손님용 페이지',
            to: {
              path: '/test/lv3'
            }
          },
          {
            icon: 'pets',
            title: '일반유저용 페이지',
            to: {
              path: '/test/lv2'
            }
          },
          {
            icon: 'pan_tool',
            title: '슈퍼유저용 페이지',
            to: {
              path: '/test/lv1'
            }
          },
          {
            icon: 'motorcycle',
            title: '관리자용 페이지',
            to: {
              path: '/test/lv0'
            }
          },
          {
            icon: 'motorcycle',
            title: '뷰 드래그 테스트',
            to: {
              path: '/test/vuedragTest'
            }
          }
        ]
      },
      {
        icon: 'settings',
        title: '관리메뉴',
        active: true,
        subItem: [
          {
            icon: 'face',
            title: '사용자관리',
            to: {
              path: '/user'
            }
          },
          {
            icon: 'pageview',
            title: '페이지관리',
            to: {
              path: '/manage/page'
            }
          },
          {
            icon: 'settings',
            title: '사이트관리',
            to: {
              path: '/manage/site'
            }
          },
          {
            icon: 'face',
            title: '사용자관리 components',
            to: {
              path: '/manage/users'
            }
          },
          {
            icon: 'settings',
            title: '게시판관리 ',
            to: {
              path: '/manage/boards'
            }
          }
        ]
      }],
      title: this.$apiRootPath // 'Vuetify.js'
    }
  },
  mounted () {
    this.getSite()
    console.log('mounted가 먼저?')
  },
  created () {
    console.log('created 가 먼저?')
  },
  methods: {
    getSite () {
      this.$axios.get('/site')
        .then(r => {
          this.siteTitle = r.data.d.title
          this.siteCopyRight = r.data.d.copyright
          this.siteDark = r.data.d.dark
        })
        .catch(e => console.log(e.message))
    },
    signOut () {
      // localStorage.removeItem('token')
      this.$store.commit('delToken')
      this.$router.push('/sign')
    }
  }
}
</script>

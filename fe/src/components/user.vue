<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">{{user.id}}</h3>
    </v-card-title>
    <v-card-text primary-title>
      <div>
        <div>이름: {{user.name}}</div>
        <div>권한: {{user.lv}}</div>
        <div>나이: {{user.age}}</div>
        <div>로그인 횟수: {{user.inCnt}}</div>
      </div>
    </v-card-text>
    <!-- <v-divider light></v-divider>
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
    </v-card-actions> -->
    <v-card-actions>
      <v-btn color="red" @click="parent">에밋 테스트</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ['user'],
  methods: {
    parent () {
      this.$emit('sbOpen', 'to mother')
    }
  }
}
</script>

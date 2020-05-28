<template>
  <v-container>
    <v-alert type="info" :value="true">
      레벨 3 손님용
    </v-alert>
  </v-container>
</template>
<script>
import moment from 'moment'

export default {
  mounted () {
    // console.log(new Date()) 자바
    console.log(moment().toDate()) // toDate()를 추가하면 new Date랑 같아지고 몽고디비에 저장시 이런형식으로 해야함
    console.log(moment().format('YYYY/MM/DD'))
    console.log(moment().minutes())
    console.log(moment().add(3, 'hours').toString())
    moment.locale('ko')
    console.log(moment().fromNow())
    console.log(moment().add(-5, 'hours').fromNow())
    console.log(moment().subtract(5, 'hours').fromNow())
    const bt = moment().add(-3, 'hours')
    console.log(bt.diff(moment(), 'seconds'))
    console.log(moment().diff(bt, 'seconds'))
  }
}
</script>

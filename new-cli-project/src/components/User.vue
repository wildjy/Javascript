<template>
  <div class="blue lighten-3 pa-3">
    <h1>User 컴포넌트</h1>
    <p>이름: {{ name }}</p>
    <v-btn @click="changeName()">이름변경</v-btn>

    <hr>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <UserDetail :nameOfChild="name"></UserDetail> <!-- v-bind:nameOfChild : 변수명 약어 > :nameOfChild -->
      </v-flex>
      <v-flex xs12 sm6>
        <UserEdit></UserEdit>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import UserDetail from "./UserDetail.vue"
import UserEdit from "./UserEdit.vue"

export default {
  components: {
    UserDetail,
    UserEdit
  },

  data(){
    return {
      name : "야생고양이"
    }
  },

  methods : {
    changeName (){
      this.name = "야고"
    }
  }
}
</script>
<template>
  <div>
    <h1>{{ title }}</h1>
    <h2>{{ text }}</h2>
    <p>{{ count }} </p>
    <button @click="count++">추가</button>
    <HomeComponent></HomeComponent>
    <AppStatus></AppStatus>
  </div>
</template>

<script>
  import HomeComponent from "./Home.vue"

  export default{
    components: {
      HomeComponent
    },

    data(){
      return {
        title : "안녕하세요.",
        text : "vue study 힘내자!1234",
        count : 1
      }
    },
    methods:{},
    computed:{}
  }
</script>

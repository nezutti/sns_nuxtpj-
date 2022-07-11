<template>
  <div class="home">
    <SideNav></SideNav>
    <div class="home-contents">
      <h2>ホーム</h2>
      <ul>
       <li v-for="(message,index) in messages" :key="index" >
         <Message.vue

      </ul>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      messages:[],
      };
    },

  methods:{
    async getMessage(){
     const resMessage=await this.$axios.get( "http://127.0.0.1:8000/api/contact/");
     this.messages=resMessage.data.data;
     },
    },

  }

</script>

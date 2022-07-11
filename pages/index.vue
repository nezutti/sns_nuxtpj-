<template>
  <div class="home">
    <SideNav></SideNav>
    <div class="home-contents">
      <h2>ホーム</h2>
      <div v-for="(message,index) in messages" :key="index" >
        
        <Message v-bind:message="message"></Message>
       
      </div>

     
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

    created(){
      this.getMessage();
      },


  };

</script>

<template>
  <div class="home">
    <SideNav></SideNav>
    <div class="home-contents">
      <h3 class="home-title">ホーム</h3>
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
     const resMessage=await this.$axios.get( "http://127.0.0.1:8000/api/message/");
     
     this.messages=resMessage.data.data;
     console.log(this.messages);
     console.log(this.messages.comments);
     }

     },

  created(){
      this.getMessage();
      },


  

  };

</script>
<style>
*{

   margin:0px;
   padding:0px;
   
   }
.home{
  display:flex;
  }

.home-contents{
  
  padding-top:10px;
  width:100%;
  border:1px solid white;
  }

.home-title{
   color:white;
   font-weight:bold;
   font-size:16px;
   padding-bottom:10px;
   border-bottom:1px solid white;
   padding-left:10px;
  

   }
</style>
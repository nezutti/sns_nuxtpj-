<template>
  <div class="message">
    <div class="message-content">
      
      <p>{{message.name}}</p>
      <img src="" @click="heartChange">
      <p>{{heartCount}}</p>
      <img src="" @click="deleteMessage(message.id)">
      <img src="" @click="toCommentPage(message.id)">
    </div>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default{
 data(){
   return{
     message:"",
     heartCount:"",
     name:"",
     };
    },
 
props:["message"],
methods:{
  async deleteMessage(id){
      await this.$axios.delete("http://127.0.0.1:8000/api/message/"+id);
      this.getMessage();
     },
  toCommentPage(id){
    
    this.$router.push("/post/id");
  },
}
};
</script>

  
    
<template>
  <div class="message">
    <div class="message-content">
      
      <p>{{message.user.name}}</p>
      <img src="../img/heart.png">
      
      <img src="../img/cross.png" @click="deleteMessage(message.id)">
      <img src="../img/detail.png" @click="toCommentPage(message.id)">
    </div>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default{
 data(){
   return{
     message:"",
     
     name:"",
     };
    },
 
props:["message"],
methods:{
  async deleteMessage(id){
      await this.$axios.delete("http://127.0.0.1:8000/api/message/"+id);
      this.getMessage();
     },
  async toCommentPage(id){
    await this.$axios.get("http://127.0.0.1:8000/api/message/"+id);
    this.$router.push("/post/id");
  },

 

}
}
</script>

  
    
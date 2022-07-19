<template>
  <div class="message">
    <div class="message-content">
      
      <p>{{message.user.name}}</p>
      <img src="../img/heart.png" v-bind:class="heartColor" @click="changeHeart()">
      <p>{{message.hearts.length}}</p>
      <img src="../img/cross.png" v-bind:class="heartColor" @click="deleteMessage(message.id)">
      <img src="../img/detail.png" @click="toCommentPage(message.id)">
    </div>
    <p>{{message.message}}</p>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default{

data(){
    return{
       heart:false,
       heartColor:"whiteColor",
       
      }
    },

props:["message"],

methods:{
  async deleteMessage(id){
      await this.$axios.delete("http://127.0.0.1:8000/api/message/"+id);
       location.reload();
      this.getMessage();
     },
 
  async toCommentPage(id){
      this.$router.push(`/posts/${id}`);
   },

  async changeHeart(){
       this.heart=!this.heart;
       if(this.heart){
         const currentUser = firebase.auth().currentUser;
         if(currentUser) {
          console.log(this.message.id);
           sendHeart={user_uid:currentUser.uid, message_id:this.message.id};
           await this.$axios.post("http://localhost:8000/api/heart/",sendHeart);
           this.message.hearts.length++;
           this.heartColor="redColor";
          

       }
       }else{
          await this.$axios.delete("http://localhost:8000/api/heart/"+id);
          this.message.hearts.length--;
          this.heartColor="whiteColor";
           
          

      }
      this.getMessage();
    },

    
    
    
    

   async getMessage(){
    const resMessage=await this.$axios.get( "http://127.0.0.1:8000/api/message/"+id);
     
    
    
     this.messages=resMessage.data.data;
     },

 

}
}
</script>
<style>
 
 .redColor{
    color:red;
  }

.whiteColor{
    color:white;
    }
</style>


  
    
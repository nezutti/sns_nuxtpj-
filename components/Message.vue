<template>
  <div class="message">
    <div class="message-content">
      
      <p class="message-userName">{{message.user.name}}</p>
      <img src="../img/heart.png" v-bind:class="heartColor" @click="changeHeart()">
      <p>{{message.hearts.length}}</p>
      <img src="../img/cross.png" class="crossImg" @click="deleteMessage(message.id)">
      <img src="../img/detail.png" class="detailImg" @click="toCommentPage(message.id)">
    </div>
    <p class="message-text">{{message.message}}</p>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default{

data(){
    return{
       activeHeart:true,
       heartColor:"whiteColor",
       
       
       
      }
    },

props:["message"],

methods:{
  async deleteMessage(id){
      console.log(this.message);
      
      await this.$axios.delete("http://127.0.0.1:8000/api/message/"+id);
       location.reload();
      this.getMessage();

     },
 
  async toCommentPage(id){
      this.$router.push(`/posts/${id}`);
   },

  async changeHeart(){
       
       
      this.activeHeart=!this.activeHeart;
       if(this.activeHeart){
         const currentUser = firebase.auth().currentUser;
         if(currentUser) {
           
           const sendHeart={user_uid:currentUser.uid, message_id:this.message.id};
           await this.$axios.post('http://localhost:8000/api/heart',sendHeart);
          
           this.message.hearts.length++;
           this.heartColor="redColor";
          

       }
       }else{
           const currentUser = firebase.auth().currentUser;
           if(currentUser) {
           
          const sendHeart={user_uid:currentUser.uid, message_id:this.message.id};
        
          await this.$axios.post("http://localhost:8000/api/heart/delete",sendHeart);
         
             
          
          this.message.hearts.length--;
          this.heartColor="whiteColor";


          }
           
       }
      location.reload();
      this.getMessage();
      
   },   

    
 
    

   async getMessage(){
    const resMessage=await this.$axios.get( "http://127.0.0.1:8000/api/message/");
     
    
    
     this.messages=resMessage.data.data;
     },

 

}
}
</script>
<style>
 
 .redColor{
   -webkit-mask-image:url("../img/heart.png");
    mask-image: url("../img/heart.png");
    mask-size: contain;
   -webkit-mask-size: contain;
    mask-repeat: no-repeat;
   -webkit-mask-repeat: no-repeat;
    background-color:red;
  
    
   
    width:20px;
    height:20px;
    cursor:pointer;
  }

.whiteColor{
  -webkit-mask-image:url("../img/heart.png");
   mask-image: url("../img/heart.png");
   mask-size: contain;
   -webkit-mask-size: contain;
    mask-repeat: no-repeat;
   -webkit-mask-repeat: no-repeat;
   background-color:white;
   margin:0px 6px;
   
    width:20px;
    height:20px;
    cursor:pointer;
    }

.crossImg{
  width:20px;
  height:20px;
  margin-left:6px;
  cursor:pointer;
  }

.detailImg{
  width:20px;
  height:20px;
  margin-left:30px;
  cursor:pointer;
  }
  
.message-content{
  display:flex;
  justify-content:left;
  }

.message{
  border:1px solid white;
  padding:10px;
  }

.message-userName{
   color:white;
   font-weight:bold;
   font-size:15px;

  }

.message-text{
  color:white;
  
  font-size:15px;
  margin-top:10px;
  }
</style>


  
    
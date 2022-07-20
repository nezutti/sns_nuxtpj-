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
      await this.$axios.delete("http://127.0.0.1:8000/api/message/"+id);
       location.reload();
      this.getMessage();
     },
 
  async toCommentPage(id){
      this.$router.push(`/posts/${id}`);
   },

  async changeHeart(){
       console.log(this.message);
       console.log(this.message.id);
       this.activeheart=!this.activeheart;
       if(this.activeHeart){
         const currentUser = firebase.auth().currentUser;
         if(currentUser) {
           
           const sendHeart={user_uid:currentUser.uid, message_id:this.message.id};
           await this.$axios.post("http://localhost:8000/api/heart/",sendHeart);
          
           this.message.hearts.length++;
           this.heartColor="redColor";
          

       }
       }else{
         
          
          await this.$axios.delete('http://localhost:8000/api/heart/${this.message.id}');
          this.hearts=message.hearts;
          this.message.hearts.length--;
          this.heartColor="whiteColor";
           
          

      }
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
    background-color:white;
    margin:0px 6px;
   
    width:20px;
    height:20px;
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
    }

.crossImg{
  width:20px;
  height:20px;
  margin-left:6px;
  }

.detailImg{
  width:20px;
  height:20px;
  margin-left:30px;
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
  font-weight:bold;
  font-size:15px;
  margin-top:10px;
  }
</style>


  
    
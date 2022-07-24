<template>
  <div class="message">
    <div class="message-content">
      
      <p class="message-userName">{{message.user.name}}</p>
      <img src="../img/heart.png" v-if="activeHeart" class="heartColor" @click="changeHeart()">
      <img src="../img/heart3.png" v-if="!activeHeart"  class="heartColor" @click="changeHeart()">
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
       
       
       
       
      }
    },

props:["message"],

methods:{
  async deleteMessage(id){
      console.log(this.message);
      
      await this.$axios.delete("http://127.0.0.1:8000/api/message/"+id);
      location.reload();
       
      

     },
 
  async toCommentPage(id){
      this.$router.push(`/posts/${id}`);
   },

  async changeHeart(){
       
       
    
       if(this.activeHeart){
         
         const currentUser = firebase.auth().currentUser;
         if(currentUser) {
           
           const sendHeart={user_uid:currentUser.uid, message_id:this.message.id};
          const data=await this.$axios.post('http://localhost:8000/api/heart',sendHeart);
          console.log(data);
          
           this.message.hearts.length++;
            this.activeHeart=!this.activeHeart;
           
          

       }
       }else{
          const currentUser = firebase.auth().currentUser;
           console.log(currentUser);
           if(currentUser) {
           
          const sendHeart={user_uid:currentUser.uid,message_id:this.message.id};
          
          const data=await this.$axios.post('http://localhost:8000/api/heart/delete',sendHeart);
           console.log(data);
             
          
          this.message.hearts.length--;
          this.activeHeart=!this.activeHeart;
          


          }
           
       }
      
    
      
   },   

    
 
    

   async getMessage(){
    const resMessage=await this.$axios.get( "http://127.0.0.1:8000/api/message/");
     
    
    
     this.messages=resMessage.data.data;
     },
   
   
   async findHeart(){
  
     firebase.auth().onAuthStateChanged(async (user) => {
     if(user){  
      console.log(user);    
      const user_uid=user.uid;
      await this.$axios.post('http://localhost:8000/api/heart/find',user_uid);
      
    
    }
    })

  }
          

},

created(){
    this.findHeart();
  }
}
</script>
<style>
 
 .heartColor{
      width:20px;
      height:20px;
      margin:0px 6px;
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


  
    
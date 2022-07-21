<template>
  <div class="sideNav">
    <img src="../img/logo.png" class="logo">
    <br/>
    <NuxtLink to="/" class="homeLink">ホーム</NuxtLink>
    <h3 @click="logout" class="logoutLink">ログアウト</h3>

    <div class="message-post">
      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="{errors}" rules="required|max:120">
          <label for="message" class="message-label">シェア</label>
          <br/>
          <textarea v-model="newMessage" name="message" id="message" class="message-form"></textarea>
          <div class="error">{{ errors[0] }}</div>

        </validation-provider>
        <button @click="insertMessage" class="share-btn">シェアする</button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default{
  data(){
   return{
    newMessage:null,
    uid:"",
    };
  },

  methods:{
   logout(){
   firebase
    .auth()
    .signOut()
    .then(() => {
      alert('ログアウトが完了しました')
      this.$router.replace('/login')
      
        })
     },

    async insertMessage(){
    const currentUser = firebase.auth().currentUser;
      if(currentUser) {
        const sendMessage = { message: this.newMessage, user_uid: currentUser.uid };
        console.log(sendMessage);
        await this.$axios.post("http://127.0.0.1:8000/api/message", sendMessage);
        this.getMessage();
      }
    },

     async getMessage(){
     const resMessage=await this.$axios.get( "http://127.0.0.1:8000/api/message/");
     console.log(resMessage);
      location.reload()
     this.messages=resMessage.data.data;
     },

       created(){
      this.getMessage();
      },

   },
  };


</script>
<style>
*{
   
   margin:0px;
   padding:0px;
   
   }

.sideNav{
  padding:16px 16px;
  }
  

.logo{
 width:100px;
 }

 .message-form{
   width:300px;
   height:100px;
   border-radius:10px;
   border:1px solid white;
   padding:10px;
   }
.homeLink{
  text-decoration:none;
  color:white;
  font-size:13px;
  font-weight:bold;
  margin:5px;
  cursor:pointer;
  }

.logoutLink{
  color:white;
  font-size:13px;
  margin:5px;
  cursor:pointer;
}

.share-btn{
  display:block;
   width:100px;
    border-radius:15px;
    border:1px solid #704cbc;
    margin:10px 0 0 auto;
    padding:5px 10px;
    color:white;
    cursor:pointer;
    font-weight:bold;
    background-color:#704cbc;

    }

.message-label{
  font-size:13px;
  font-weight:bold;
  color:white;
  margin:5px;
  }
     
  

   
</style>

  
     

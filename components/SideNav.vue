<template>
  <div class="SideNav">
    <img src="../img/logo.png">
    <NuxtLink to="/">ホーム</NuxtLink>
    <h3 @click="logout">ログアウト</h3>

    <div class="message-post">
      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="{errors}" rules="required|max:120">
          <label for="message">シェア</label>
          <textarea v-model="newMessage" name="message" id="message"></textarea>
          <div class="error">{{ errors[0] }}</div>

        </validation-provider>
        <button @click="insertMessage">シェアする</button>
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
     this.messages=resMessage.data.data;
     },

       created(){
      this.getMessage();
      },

   },
  };


</script>
  
     

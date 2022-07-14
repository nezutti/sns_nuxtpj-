<template>
  <div class="SideNav">
    <img src="">
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
     const sendMessage={message:this.newMessage};
     await this.$axios.post("http://127.0.0.1:8000/api/message",sendMessage);
     this.getCount();
       },
    },
  };


</script>
  
     

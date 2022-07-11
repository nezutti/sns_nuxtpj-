<template>
  <div clas="register">
    <AuthHeader></AuthHeader>
    <div class="register-form">
      <h2>新規登録</h2>
      <varidation-observer ref="obs" v-slot="ObserverProps">
        <varidation-provider v-slot="{ errors }" rules="required|max:20">
          <input v-model="name" type="text" name="name" id="name">
          <div class="error">{{errors[0]}}</div>
        </varidation-provider>
        <varidation-provider v-slot="{errors}" rules="required|email">
          <input v-model="email" type="email" name="email" id="email">
          <div class="error">{{errors[0]}}</div>
        </varidation-provider>
        <varidation-provider v-slot="{errors}" rules="required">
          <input v-model="password" type="password name="password" id="password">
          <div class="error">{{errors[0]}}</div>
        </varidation-provider>
        <button @click="register">新規登録</button>
      </varidation-observer>
    </div>
  </div>
</template>
    

<script>
import firebase from '~/plugins/firebase'
export default{
   data(){
     return{
       name:"",
       email:"",
       password:"",
       uid:"",
      };
    },

    methods:{
      register(){
      if (!this.name || !this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.name,this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification()
          })
        .then((userCredential)=>{
           
           this.name=userCrediential.user.name;
           this.uid=userCredential.user.uid;
           const sendData={
             name:this.name,
             uid:this.uid,
             };
           $this.axios.post("http://127.0.0.1:8000/api/user/",sendData);

           })

           
        .then(() => {
           
            
            this.$router.replace('/login')
          })
        
          .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
      },
    },
  }
</script>

        
  
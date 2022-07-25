<template>
  <div class="login">
    <AuthHeader></AuthHeader>
    <div class="login-form">
      <h2>ログイン</h2>
      <input v-model="email" type="email" name="email" placeholder="メールアドレス" required/>
      <br/>
      <input v-model="password" type="password" name="password" placeholder="パスワード"  required/>
      <br/>
      <button @click="login" class="login-btn">ログイン</button>
      </br/>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default{
  data(){
    return{
      email:null,
      password:null,
     }
    },

  methods:{
    login(){
      if(!this.email||!this.password){
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
        }
        firebase 
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
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

<style>


.login-form{
  width:300px;
  padding:1% 3%;
  margin:200px auto;
  background-color:white;
  border-radius:8px;
  overflow:hidden;
  
  }

h2{
  background-color:white;
  text-align:center;
  font-weight:bold;
  font-size:15px;
  }

input{
  background:white;
  height:30px;
  width:100%;
  border-radius:5px;
  margin:10px 0px;
  display:inline-block;
  padding-left:2%;
  
  
  
  
  

  }

  .login-btn{
    display:block;
     width:100px;
     border-radius:15px;
     margin:10px auto;
     padding:5px 10px;
     color:white;
     cursor:pointer;
     font-weight:bold;
     background-color:#704cbc;
     
     }

    .error{
     background-color:white;
     }
</style>

        
  
      
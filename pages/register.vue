<template>
  <div clas="register">
    <AuthHeader></AuthHeader>
    <div class="register-form">
      <h2>新規登録</h2>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="{ errors }" rules="required|max:20">
          <input v-model="name" type="text" name="name" id="name" placeholder="ユーザーネーム">
          <div class="error">{{errors[0]}}</div> 
         </validation-provider>
         
        <validation-provider v-slot="{errors}" rules="required|email">
          <input v-model="email" type="email" name="email" id="email" placeholder="メールアドレス">
          <div class="error">{{errors[0]}}</div>
        </validation-provider>
        <validation-provider v-slot="{errors}" rules="required">
          <input v-model="password" type="password" name="password" id="password" placeholder="パスワード">
          <div class="error">{{errors[0]}}</div>
        </validation-provider>
        <button @click="register" class="register-btn">新規登録</button>
      </validation-observer>
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
        alert('ユーザー名、メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          console.log(data);
          data.user.sendEmailVerification();
          
          this.uid=data.user.uid;
           const sendData={
             name:this.name,
             uid:this.uid,
             };
           this.$axios.post("http://127.0.0.1:8000/api/user/",sendData)
          
         

           

      
           
        .then(() => {
           
            
            this.$router.replace('/login')
          })
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

<style>
.register-form{
  width:300px;
  padding:1% 3%;
  margin:200px auto;
  background-color:white;
  border-radius:8px;
  overflow:hidden;
  z-index:10;
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

  .register-btn{
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
</style>



        
  
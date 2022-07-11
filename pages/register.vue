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
export default{
   data(){
     return{
       name:"",
       email:"",
       password:""
      };
    },
  };
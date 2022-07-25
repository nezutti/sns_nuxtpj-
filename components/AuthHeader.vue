<template>
 <div class="authHeader">
   <img src="@/img/logo.png" class="logo">
   <div class="authLink">
     <NuxtLink to="/register" class="registerLink">新規登録</NuxtLink>
     <NuxtLink to="/login" class="loginLink">ログイン</NuxtLink>
   </div>
 </div>
</template>
<style>
 *{
   background-color:#00053a;
   
   margin:0px;
   padding:0px;
   
   }
.authHeader{
   display:flex;
   justify-content:space-between;
   margin:10px;
   z-index:5;
  }
  
.logo{
   width:200px;
   }

.registerLink{
    color:white;
    font-size:15px;
    font-weight:bold;
    text-decoration:none;
    margin-right:10px;
    
  }
.authLink{
 padding-top:15px;
}

.loginLink{
   color:white;
   font-weight:bold;
   font-size:15px;
   text-decoration:none;
  }
</style>



<template>
  <div class="post-page">
    <SideNav></SideNav>
    <div class="post">
      <div class="message">
        <h2>ホーム</h2>
        <Message v-bind:message="message"></Message>
      
      </div>
      
      <div class="comments">
        <h3>コメント</h3>
        <div v-for="(comment,index) in comments" :key="index">
          <div class="comment">
            <p>{{comment.user.name}}</p>
            <p>{{comment.comment}}</p>
          </div>
        </div>
        <div class="comment-form">
          <validation-observer ref="obs" v-slot="ObserverProps">
            <validation-provider v-slot="{errors}" rules="required|max:120">
              <textarea v-model="newComment"  name="comment" id="comment"></textarea>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <button @click="insertComment">コメント</button>
          </validation-observer>
        </div>
      </div>
    </div>    
  </div>   
</template>

<script>
import firebase from '~/plugins/firebase'
export default{

  data(){
    return{
      comments:[],
      newComment:"",
      message:[],
      };
    },

  methods:{
   
    
    async findMessage(){
       
       const findData=await this.$axios.get(`http://127.0.0.1:8000/api/message/${this.$route.params.id}`);
      
       this.message=findData.data.data;
       this.comments=findData.data.data.comments;
       console.log(this.message);
       console.log(this.message.comments);
       console.log(this.message.message);
      
       

     },

    async insertComment(){
      const currentUser = firebase.auth().currentUser;
      if(currentUser) {
        const sendComment= { comment: this.newComment, user_uid: currentUser.uid} ;
        
      await this.$axios.post("http://127.0.0.1:8000/api/comment/",sendComment);
      this.findMessage();
    }
  },
  
    
  },
  created(){
     this.findMessage();
  },
    
  }
</script>
    
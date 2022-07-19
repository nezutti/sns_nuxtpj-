<template>
  <div class="post-page">
    <SideNav></SideNav>
    <div class="post">
      <div class="message">
        <h2>ホーム</h2>
        
        <Message v-if="message2"  v-bind:message="message2"></Message>

        </div>
        
        
        
        
      
      </div>
      
      <div class="comments">
        <h3>コメント</h3>
       
        <div v-for="(comment,index) in comments">   
          <p>{{comment.user.name}}</p>
          <p>{{comment.comment}}</p>
          
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
      message2:"",
      };
    },

  methods:{
   
    
    async findMessage(){
       
       const findData=await this.$axios.get(`http://127.0.0.1:8000/api/message/${this.$route.params.id}`);
      
       this.message2=findData.data.data;
       this.comments=findData.data.data.comments;
       console.log(this.message2);
       console.log(this.message2.message);
       console.log(this.message2.comments);
       console.log(this.message2.user);
       console.log(this.message2.user.name);
       console.log(this.comments);
       
      
      
      
       

     },

    async insertComment(){
      const currentUser = firebase.auth().currentUser;
      if(currentUser) {
      const sendComment= { comment: this.newComment, user_uid: currentUser.uid,message_id:this.message2.id} ;
        
      await this.$axios.post("http://127.0.0.1:8000/api/comment/",sendComment);
      this.findMessage();
    }

    },

    async deleteComment(){
        await this.$axios.delete("http://127.0.0.1:8000/api/comment/"+id);
        location.reload();
        this.findMessage();
    },
  
    
  },
  created(){
     this.findMessage();
  },
    
  }
</script>
    
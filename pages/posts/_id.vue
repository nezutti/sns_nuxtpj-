<template>
  <div class="post-page">
    <SideNav></SideNav>
    <div class="post">
      <div class="message2">
        <h2 class="home-title">ホーム</h2>
        
        <Message v-if="message2"  v-bind:message="message2"></Message>

        
        
        
        
        
      
      </div>
      
      <div class="comments">
        <h3 class="comment-title">コメント</h3>
       
        <div v-for="(comment,index) in comments" class="comment"> 
            
          <div class="commentNameCross">
            <p class="commentName">{{comment.user.name}}</p>
          
            <img src="../../img/cross.png" class="commentCrossImg" @click="deleteComment(comment.id)">
          </div>
          <p class="commentContent">{{comment.comment}}</p>
          
        </div>
          
        
        <div class="comment-form">
          <validation-observer ref="obs" v-slot="ObserverProps">
            <validation-provider v-slot="{errors}" rules="required|max:120">
              <textarea v-model="newComment"  name="comment" id="comment" class="comment-area"></textarea>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <button @click="insertComment" class="comment-btn">コメント</button>
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
      },

    async insertComment(){
      const currentUser = firebase.auth().currentUser;
      
      if(currentUser) {
      const sendComment= { comment: this.newComment, user_uid: currentUser.uid,message_id:this.message2.id};
        
      await this.$axios.post('http://127.0.0.1:8000/api/comment/',sendComment);
    
       }
       this.findMessage();
       location.reload();

       
    },



    async deleteComment(id){
        
        await this.$axios.delete('http://127.0.0.1:8000/api/comment/'+id);
        location.reload();
        
        
       
        
    },
  
    
  },
  created(){
     this.findMessage();
  },
    
  }
</script>
<style>
*{
   
    

    
 }

 .post{
   width:100%;
   }

 .message2{
   width:100%;
   }

.comments{
  width:100%;
  
  }

  .comment{
    border-bottom:1px solid white;
    border-left:1px solid white;
    padding:10px;
    

    }

.comment-title{
  border-bottom:1px solid white;
  border-left:1px solid white;
  font-size:14px;
  text-align:center;
  background-color:#00053a;
  padding:5px 0px;
  color:white;
  }




.post-page{
  display:flex;


}

.commentName{
font-size:13px;
font-weight:bold;
color:white;
}

.commentContent{
   font-size:13px;
   color:white;
}

.home-title{
  border-left:1px solid white;
  padding-top:5px;
  background-color:#00053a;

  }

  .comment-form{
     width:100%;
     margin:20px;
     

  }

  .comment-area{
    width:90%;
    border-radius:5px;
    border:1px solid white;
    padding:2px 4px;
    color:white;

    }

  .comment-btn{
    display:block;
    width:100px;
    border-radius:15px;
    border:1px solid #704cbc;
    margin:5px 50px 0 auto;
    padding:5px;
    color:white;
    cursor:pointer;
    font-weight:bold;
    background-color:#704cbc;

    }

  .commentContent{
     margin-top:10px;
     }
    
  .commentNameCross{
    display:flex;
    }

  .commentCrossImg{
   width:20px;
   height:20px;
   margin-left:30px;
   }


 


</style>
    
<template>
  <div class="post-page">
    <SideNav></SideNav>
    <div class="post">
      
      <h2>ホーム</h2>
      <Message></Message>
      
      <div class="comments">
        <h3>コメント</h3>
        <div v-for="(comment,index) in comments" :key="index">
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
export default{
  data(){
    return{
      commemts:[],
      newComment:"",
      };
    },

  methods:{
    async getComment(){
       const commentData=await this.$axios.get( "http://127.0.0.1:8000/api/comment/");
       this.comments=commentData.data.data;
      },

    async insertCommet(){
      const sendComment={comment:this.newComment}; //送る先のテーブルのカラムと同じ値にする(comment)//
      await this.$axios.get("http://127.0.0.1:8000/api/comment/",sendComment);
      this.getComment();
    },
  },
  created(){
    this.getComment();
   },
};
</script>
    


    
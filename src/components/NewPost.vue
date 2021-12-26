<template>
<div>
    New Post
    <PostWriter :post="newPost"
    @save="save"
    />
</div>
</template>
<script lang="ts">
import moment from 'moment';
import { defineComponent } from 'vue'
import { Post } from '../mocks';
import { useStore } from '../store';
import PostWriter from './PostWriter.vue'
import { useRouter } from 'vue-router';
export default defineComponent({
    components:{
        PostWriter
    },
    setup() {
      const newPost : Post ={
          id: '-1',
          title: 'Enter Your Title',
          created: moment().subtract(1, 'second')
      };  
      const store = useStore();
      const router= useRouter();
      const save = async(post:Post) =>{
            console.log("p", post)
            store.createPost(post)
            router.push('/')
      }
      return{
          save,
          newPost
      }
    },
})
</script>

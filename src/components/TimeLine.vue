<template>
<div>
<nav class="is-primary panel">
  <span class="panel-tabs">
    <a v-for="period in periods"
     :key="period"
     :data-test="period"
    :class="{ 'is-active': period === currentPeriod }"
     @click="setPeriod(period)"
    
    >
     {{period}}
    </a>
  </span>
  <TimeLinePost
   v-for="post in posts" 
   :key="post.id"
   :post="post"
    class="panel-block"/>
   
</nav>
</div>
</template>

<script lang="ts">
import { defineComponent ,ref, computed} from 'vue';
import moment from "moment"
import { Post} from '../mocks';
import { useStore } from '../store'
import TimeLinePost from './TimeLinePost.vue'
type Period = 'Today' | 'This Week' | 'This Month'

export default defineComponent({
  name: 'TimeLine',
  components:{
    TimeLinePost
  },

   async setup(){
    const periods: Period[] = ['Today','This Week', 'This Month'];
    const currentPeriod= ref<Period>('Today');
    const store = useStore()
    if(!store.getState().posts.loaded){
     await store.fetchPosts()
    }
   const allPosts: Post[] = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
      const thePost = store.getState().posts.all.get(id)
      if (!thePost) {
        throw Error('This post was not found')
      }
      return acc.concat(thePost)
    }, [])

      const posts= computed(() => {
          return  allPosts.filter(post => {
          
        if (currentPeriod.value === 'Today') {
          return post.created.isAfter(moment().subtract(1, 'day'))
        }
        if (currentPeriod.value === 'This Week') {
          return post.created.isAfter(moment().subtract(1, 'week'))
        }
        if (currentPeriod.value === 'This Month') {
          return post.created.isAfter(moment().subtract(1, 'month'))
        }
        else{
            return false
        }
                
          })
      });
    const setPeriod = (period:Period) =>{
      currentPeriod.value = period
    }
     return{
     periods,
     currentPeriod,
     setPeriod,
     posts
  }
  }
 
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
<div>

  <a 
  :key="post.id" class="panel-block">
  <div class="is-flex is-flex-direction-column is-align-item-flex-start">
   <a>  {{post.title}}</a>
    <div>{{ post.created.format('Do MMM') }}</div>
    </div>
  </a>

</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {Post} from '../mocks'
type Period = 'Today' | 'This Week' | 'This Month'
export default defineComponent({
  name: 'TimeLinePost',
  props:{
      post:{
          type:Object as () => Post,
          required: true
      }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

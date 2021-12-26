<template>
<div>

  <suspense>
    <template #default>
     <TimeLine/>
    </template>
  <template #fallback>
   <Spinner/>
  </template>
  </suspense>
 
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimeLine from './TimeLine.vue'
import Spinner from './Spinner.vue'
export default defineComponent({
  name: 'Home',
  components:{
    TimeLine,
    Spinner
  }

});
</script>

<style>

</style>

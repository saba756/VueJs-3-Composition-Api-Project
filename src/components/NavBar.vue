<template>
  <div>
    <div class="navbar">
      <div class="navbar-end">
        <div class="buttons">
          <router-link to="/posts/new" class="button"> Post</router-link>
        </div>
      </div>
    </div>
      <teleport to="#body" >
        <div>Modal</div>
    </teleport>
  </div>

</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    let isMounted = false;
    onMounted(() => {
      isMounted = true;
      console.log("hi", isMounted);
    });
    return { isMounted };
  },
});
</script>

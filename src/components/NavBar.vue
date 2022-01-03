<template>
  <div>
    <div class="navbar">
      <div class="navbar-end">
        <div class="buttons">
          <button class="button" @click="show">Sign Up</button>
          <router-link to="/posts/new" class="button"> Post</router-link>
        </div>
      </div>
    </div>
    <teleport to="#modal">
      <div>Modal</div>
    </teleport>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useModal } from "../useModal";
export default defineComponent({
  setup() {
    const modal = useModal();
    return {
      show: () => {
        modal.showModal();
      },
    };
  },
});
</script>

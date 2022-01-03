<template>
  <div>
    <div class="modal" :style="style">
      <div class="modal-background"></div>
      <div class="modal-content"></div>
      <button @click="hide" class="modal-close is-large"></button>
    </div>
    <section class="section">
      <div class="container">
        <FormInput
          v-model="username"
          name="Username"
          type="text"
          :error="usernameStatus.message"
        />{{ username }}
        <NavBar />
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import NavBar from "./components/NavBar.vue";
import FormInput from "./components/FormInput.vue";
import { useModal } from "./useModal";
import { required, length, Status, validate } from "./validation";
export default defineComponent({
  name: "App",
  components: {
    NavBar,
    FormInput,
  },

  setup() {
    const modal = useModal();
    const username = ref("username");
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [
        required(),
        length({ min: 5, max: 10 }),
      ]);
    });
    const style = computed(() => {
      return {
        display: modal.show.value ? "block" : "none",
      };
    });
    return {
      usernameStatus,
      username,
      style,
      hide: () => {
        modal.hideModal();
      },
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<template>
  <div>
    <form @submit.prevent="submit">
      <FormInput
        v-model="username"
        name="Username"
        type="text"
        :error="usernameStatus.message"
      />
      <FormInput
        v-model="password"
        name="Password"
        type="password"
        :error="passwordStatus.message"
      />
      <button
        class="button is-primary"
        :disabled="!usernameStatus.valid || !passwordStatus.valid"
      >
        Button
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import FormInput from "./FormInput.vue";
import { required, length, Status, validate } from "../validation";
import { User, useStore } from "../store";
import { useModal } from "../useModal";
export default defineComponent({
  components: {
    FormInput,
  },

  setup() {
    const username = ref("username");
    const password = ref("password");
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [
        required(),
        length({ min: 5, max: 10 }),
      ]);
    });
    const store = useStore();
    const modal = useModal();
    const submit = async (evt: Event) => {
      if (!usernameStatus.value.valid || !passwordStatus.value.valid) {
        return;
      }
      const newUser: User = {
        id: "-1",
        username: username.value,
        password: password.value,
      };
      await store.createUser(newUser);
      modal.hideModal();
    };
    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [
        required(),
        length({ min: 5, max: 40 }),
      ]);
    });

    return {
      usernameStatus,
      passwordStatus,
      username,
      password,
      submit,
    };
  },
});
</script>

<style scoped>
form {
  padding: 15px;
  background: white;
}
</style>
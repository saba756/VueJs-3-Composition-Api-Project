<template>
  <div>
    <div id="body">
     
    </div>
    <section class="sectin">
      <div class="container">
        <NavBar />
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import NavBar from "./components/NavBar.vue";
export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },

  setup() {
    const target = ref(null);
    onMounted(() => {
      console.log("hi app", target.value);
    });
    return {
      target,
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
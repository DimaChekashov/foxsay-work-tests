<template>
  <!-- Компонент building
    Вы можете задать через пропсы кол-во этажей 
    :floors и количество лифтов :lifts-amount 
    Значения по умолчанию floors: 5, lifts-amount: 1 
  -->
  <building />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Building from "./components/Building.vue";

export default defineComponent({
  name: "App",
  components: { Building },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  padding: 15px;
  height: 100vh;
}
</style>

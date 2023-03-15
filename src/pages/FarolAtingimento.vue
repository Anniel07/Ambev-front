<template>
  <div class="header-index row items-center justify-evenly">
    <h5
      class="text-white"
      style="font-weight: bold; text-decoration: underline"
    >
      Farol de Atingimento de Eventos
    </h5>
  </div>


  <farolChart></farolChart>
</template>

<script lang="ts">
//import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, defineAsyncComponent, ref } from 'vue';

const farolChart = defineAsyncComponent(() => import('components/charts/FarolAntigChart.vue'));

export default defineComponent({
  name: 'IndexPage',
  components: {
    /*ExampleComponent*/
    farolChart,
  },
  setup() {

    return { };
  },
});
</script>

<style lang="css" scoped>
.header-index {
  background: url('../assets/images/back-login.jpg') center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  /*padding: 30px 0;*/
  border-radius: 0 0 30px 30px;
}
</style>

<style lang="sass" scoped>
.my-card
  width: 100%
  height: 152px
  max-width: 290px
  max-heigth: 152px

h6, h5
  color: $orange
</style>

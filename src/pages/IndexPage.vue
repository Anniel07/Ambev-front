<template>
  <!--
  <q-page class="row items-center justify-evenly">

    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>-->
  <!-- falta link every card -->
  <div class="header-index">
    <div class="q-pa-md row items-center justify-center q-gutter-md">
      <q-card class="my-card">
        <q-card-section class="column items-center">
          <q-icon name="calendar_month" color="orange" size="3.0em" />

          <q-card-actions>
            <q-btn no-caps flat to="/add-eventos"
              ><h6>Cadastrar Evento</h6></q-btn
            >
          </q-card-actions>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="column items-center">
          <q-icon name="notifications" color="orange" size="3.0em" />
          <q-card-actions>
            <q-btn no-caps flat to="/lista-eventos"
              ><h6>Lista de eventos</h6></q-btn
            >
          </q-card-actions>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="column items-center">
          <q-icon name="description" color="orange" size="3.0em" />
          <q-card-actions>
            <q-btn no-caps flat to="/relatorio-auditoria"
              ><h6>Relatório de Auditoria</h6></q-btn
            >
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <h5 class="text-center" style="font-weight: bold; text-decoration: underline">
    Farol de Eventos
  </h5>
  <farolChart></farolChart>
</template>

<script lang="ts">

//import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent,defineAsyncComponent, ref } from 'vue';

const farolChart = defineAsyncComponent(() => import('components/charts/FarolAntigChart.vue'));

export default defineComponent({
  name: 'IndexPage',
  components: {
    /*ExampleComponent*/
    farolChart,
  },
  setup() {
    return {}
  },
});
</script>

<style lang="css" scoped>
.header-index {
  background: url('../assets/images/back-login.jpg') center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  padding: 30px 0;
  border-radius: 0 0 30px 30px;
}
</style>

<style lang="sass" scoped>
.my-card
  width: 100%
  height: 172px
  max-width: 290px
  max-heigth: 152px

h6, h5
  color: $orange
</style>

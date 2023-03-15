<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar
        style="background: linear-gradient(to right, #ba0c2f 0%, #451311 100%)"
      >
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title>
          <q-img
            src="../assets/images/ambev-logo-branco.png"
            style="width: 200px; height: 44px"
          ></q-img>
          <!-- Quasar App -->
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <q-btn icon="home" to="/" no-caps flat rounded label="Início"></q-btn>
        <q-btn-dropdown no-caps flat rounded label="Eventos">
          <q-list>
            <q-item to="/add-eventos"  v-close-popup>
              <q-item-section>
                <q-item-label>Cadastrar evento</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/lista-eventos" clickable v-close-popup >
              <q-item-section>
                <q-item-label>Lista de eventos</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
          icon="area_chart"
          no-caps
          flat
          rounded
          label="Farol de Atingimento"
          to="/farol-atingimento"
        ></q-btn>
        <q-btn
          icon="description"
          no-caps
          flat
          rounded
          label="Relatório de Auditoria"
          to="/relatorio-auditoria"
        ></q-btn>
        <q-btn
          icon="power_settings_new"
          no-caps
          flat
          rounded
          label="Sair"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="myfooter" elevated>
      <q-toolbar class="row items-center justify-center">
        <q-img
          src="../assets/images/ambev-logo-branco.png"
          style="width: 200px; height: 44px"
        ></q-img>
       <!--  <q-space /> -->
        <q-img
          src="../assets/images/img_agence.png"
          style="width: 90px; height: 25px"
        ></q-img>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
//import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    //EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.myfooter
  background-color: $orange
</style>
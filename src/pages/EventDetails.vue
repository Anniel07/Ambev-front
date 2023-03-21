<template>
  <div class="header-index row items-center justify-evenly">
    <h5
      class="text-white"
      style="font-weight: bold; text-decoration: underline"
    >
      Detalhes do Eventos
    </h5>
  </div>
  <br />
  <div class="q-ml-xl column items-start" style="margin-left: 300px">
    <div class="text-h6 q-mb-xs">Unidade</div>
    <p>{{ event?.unit }}</p>
  </div>

  <div class="q-ml-xl column items-start" style="margin-left: 300px">
    <div class="text-h6 q-mb-xs">Marca</div>
    <p>{{ event?.brand }}</p>
  </div>
  <div class="q-ml-xl column items-start" style="margin-left: 300px">
    <div class="text-h6 q-mb-xs">Nome do Evento</div>
    <p>{{ event?.name }}</p>
  </div>

  <div class="q-ml-xl row items-start q-gutter-xl" style="margin-left: 300px">
    <div class="text-h6 q-mb-xs">Data início: {{ event?.startDate }}</div>
    <div class="text-h6 q-mb-xs" syle="margin-left: 100px;">
      Data fim: {{ event?.endDate }}
    </div>
  </div>
  <div class="q-ml-xl row items-start q-gutter-xl" style="margin-left: 300px">
    <div class="text-h6 q-mb-xs">Horário início: {{ event?.startTime }}</div>
    <div class="text-h6 q-mb-xs" syle="margin-left: 100px;">
      Horário fim: {{ event?.endTime }}
    </div>
  </div>

  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <p>Estado: {{ event?.state }}</p>
    <p style="margin-left: 150px">Cidade: {{ event?.city }}</p>
    <p style="margin-left: 150px">CEP: {{ event?.cep }}</p>
  </div>
  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <!-- <div class="col-4"><p>Endereço: {{ event?.adress }}</p></div> -->
    <div class="col-8">
      <q-expansion-item
        expand-separator
        icon="pin_drop"
        header-class="text-orange"
        label="Endereço:"
        :caption="event?.adress"
        syle="margin-left: 300px;"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.571493761993!2d-46.68115388558403!3d-23.61969606963295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50a2bfd0d0bf%3A0xbf5928fdcfe948c6!2sR.%20Bar%C3%A3o%20do%20Triunfo%20-%20Brooklin%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1572354768921!5m2!1spt-BR!2sbr"
          width="100%"
          height="450"
          frameborder="0"
          style="border: 0"
          allowfullscreen=""
        ></iframe>
      </q-expansion-item>
    </div>
    <div class="col-4"></div>
  </div>

  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <p class="col-4">Público Estimado: {{ event?.estimatedAudience }}</p>
    <p class="col-8">Investimento: $R {{ event?.invest }}</p>
  </div>
  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <p class="col-4">Nome Produtor: {{ event?.producerName }}</p>
    <p class="col-8">Tel. Produtor: {{ event?.producerPhone }}</p>
  </div>
  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <p>E-mail do produtor: {{ event?.producerEmail }}</p>
  </div>
  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <p class="col-4">Naming ou Proprietário?:</p>
    <p class="col-8">{{ event?.carriedOutBy }}</p>
  </div>
  <!--- wrapper -->
  <div v-if="event">
    <div class="q-ml-xl row items-start" style="margin-left: 300px">
      <div class="text-h6 col-5">Contratação com o Poder Público?*</div>
      <div class="col-2">
        <q-toggle v-model="event.contractedGovernment" disable />
      </div>
      <div class="col-2">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ contratPoderPublico }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>

    <div class="q-ml-xl row items-start" style="margin-left: 300px">
      <div class="text-h6 col-5">Evento realizado em espaço público?</div>
      <div class="col-2"><q-toggle v-model="event.madePublicSpace" disable /></div>
      <div class="col-2">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ espacioPublico }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>

    <div class="q-ml-xl row items-start" style="margin-left: 300px">
      <div class="text-h6 col-5">Eventos com menores de idade?</div>
      <div class="col-2"><q-toggle v-model="event.madewithMinors" disable /></div>
      <div class="col-2">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ menorIdade }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>
    <div class="q-ml-xl row items-start" style="margin-left: 300px">
      <div class="text-h6 col-5">Ativação de risco?</div>
      <div class="col-2"><q-toggle v-model="event.riskActivation" disable /></div>
      <div class="col-2">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ actRisco }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>
    <div class="q-ml-xl row items-start" style="margin-left: 300px">
      <div class="text-h6 col-5">Ativação de marca em estrutura montada?</div>
      <div class="col-2"><q-toggle v-model="event.brandActivation" disable /></div>
      <div class="col-2">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ actRisco }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>
    <div class="q-ml-xl row items-start" style="margin-left: 300px">
      <div class="text-h6 col-5">Universitário Open Bar?</div>
      <div class="col-2"><q-toggle v-model="event.universityOpenBar" disable /></div>
      <div class="col-2">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ universitario }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>
  </div>
  <br />
</template>

<script lang="ts">
import { Event } from 'components/models';
//import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { api } from 'boot/axios';
import { useRoute } from 'vue-router';
import {
  actRisco,
  contratPoderPublico,
  espacioPublico,
  marcaEst,
  menorIdade,
  showAlert,
  universitario,
} from 'src/boot/util';
import { callGetApi } from 'src/utils/MsGraphApiCall';
import { useMsalAuthentication } from 'src/composition-api/useMsalAuthentication';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest } from 'src/authConfig';

export default defineComponent({
  name: 'IndexPage',
  components: {
    /*ExampleComponent*/
  },
  setup() {
    const { result, acquireToken } = useMsalAuthentication(InteractionType.Redirect, loginRequest);
    const route = useRoute();

    const event = ref<Event>();

    async function loadEventById(apiResult: any) {
      try {
        //const resp = await api.get('/api/Event/GetById/' + id);
        if(!apiResult.data)
          throw apiResult;
        event.value = apiResult.data.result;
        //event.value = resp.data.result;
      } catch (err: any) {
        showAlert(
          `Falha ao carregar evento: ${err.response?.data.errorMessage ?? err}`
        );
      }
    }

    // onMounted(async () => {
    //   await loadEventById(route.params.id);
    // });

    async function updateData() {
      if (result.value != undefined && result.value.accessToken) {
        const apiResult = await callGetApi(result.value.accessToken, `/api/Event/GetById/${route.params.id}`).catch(() =>
          acquireToken()
        );
        await loadEventById(apiResult);
        //console.log('api result' , data.value);
      }
    }

    updateData();

    watch(result, () => {
      // Fetch new data from the API each time the result changes (i.e. a new access token was acquired)
      updateData();
    });

    return {
      event,
      contratPoderPublico,
      espacioPublico,
      menorIdade,
      actRisco,
      marcaEst,
      universitario,
    };
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
  max-width: 300px
  border-right-style: solid
  border-right-width: 7px

.text-h6
  color: $orange

p
  color: $grey-7
  font-size: 16px
  font-weight: bold
</style>
